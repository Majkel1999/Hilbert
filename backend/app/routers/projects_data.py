from typing import List

from app.models.actions import Action
from app.models.project_models import Project, TextDocument
from app.models.request_models import FileDeleteRequest, Tag
from app.utility.connectors.rabbitmq_connector import rabbitBroker
from app.utility.file_helper import handleFile
from app.utility.security import check_for_project_ownership
from app.utility.websocket_manager import wsManager
from beanie import WriteRules
from bson import ObjectId
from fastapi import (APIRouter, Depends, HTTPException, UploadFile,
                     WebSocketDisconnect, status)
from starlette.websockets import WebSocket

router = APIRouter(
    prefix="/project",
    tags=["Project Data"],
    responses={
        status.HTTP_401_UNAUTHORIZED: {"description": "User not authenticated"},
        status.HTTP_403_FORBIDDEN: {
            "description": "User not authorized for specific project"}
    }
)


@router.websocket("/{projectId}/ws")
async def project_websocket(projectId: str, websocket: WebSocket):
    connection = await wsManager.connect(websocket, projectId)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        wsManager.disconnect(connection)


@router.post("/{project_id}/train")
async def queue_model_training(project: Project = Depends(check_for_project_ownership)):
    projectId = str(project.id)
    await wsManager.send_by_projectId(Action.ModelTrainig, projectId)
    return await rabbitBroker.sendMessage(projectId)


@router.post("/{project_id}/file")
async def upload_file(files: List[UploadFile], project: Project = Depends(check_for_project_ownership)):
    response = list()
    for file in files:
        result = await handleFile(file)
        response.extend(result)
    for document in response:
        await document.insert()
        project.texts.append(document)
    await project.save(link_rule=WriteRules.WRITE)
    await wsManager.send_by_projectId(Action.FileAdded, str(project.id))
    return response


@router.delete("/{project_id}/file",
               responses={
                   status.HTTP_400_BAD_REQUEST: {
                       "description": "File not found"}
               })
async def delete_file(file_id: FileDeleteRequest, project: Project = Depends(check_for_project_ownership)):
    notFoundException = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="File not found"
    )

    await project.fetch_all_links()
    try:
        fileId = ObjectId(file_id.file_id)
    except:
        raise notFoundException
    fileToDelete = await TextDocument.find_one(TextDocument.id == fileId)
    if(fileToDelete and any(file.id == fileId for file in project.texts)):
        await fileToDelete.delete()
        await wsManager.send_by_projectId(Action.FileDeleted, str(project.id))
    else:
        raise notFoundException


@router.get("/{project_id}/tag",
            response_model=List[str],
            responses={
                status.HTTP_400_BAD_REQUEST: {
                    "description": "Project not found"
                }
            })
async def get_tags(project_id: str):
    exception = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Project not found"
    )
    try:
        project = await Project.find_one(Project.id == ObjectId(project_id))
        if(not project):
            raise exception
        return project.data.tags
    except:
        raise exception


@router.post("/{project_id}/tag", responses={
    status.HTTP_409_CONFLICT: {"description": "Duplicate tag"}
})
async def add_tag(tag: Tag,  project: Project = Depends(check_for_project_ownership)):
    tag = tag.tag.casefold()
    if(any(x == tag for x in project.data.tags)):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Duplicate tag")
    else:
        project.data.tags.append(tag)
        await project.save()
        return f"Tag created: {tag}"


@router.delete("/{project_id}/tag", responses={
    status.HTTP_404_NOT_FOUND: {"description": "Tag not present in list"}
})
async def delete_tag(tag: Tag,  project: Project = Depends(check_for_project_ownership)):
    tag = tag.tag.casefold()
    if(any(x == tag for x in project.data.tags)):
        project.data.tags.remove(tag)
        await project.save()
        return f"Tag deleted: {tag}"
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tag not present")
