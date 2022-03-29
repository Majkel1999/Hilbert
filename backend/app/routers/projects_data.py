from typing import List

from beanie import WriteRules

from app.models.project_models import Project
from app.utility.file_helper import handleFile
from app.utility.security import check_for_project_ownership
from app.utility.connectors.rabbitmq_connector import rabbitBroker

from fastapi import APIRouter, Depends, HTTPException, UploadFile, status

router = APIRouter(
    prefix="/project/data",
    tags=["Project Data"],
    responses={
        status.HTTP_401_UNAUTHORIZED: {"description": "User not authenticated"},
        status.HTTP_403_FORBIDDEN: {
            "description": "User not authorized for specific project"}
    }
)


@router.post("/train/{project_id}")
async def queue_model_training(project: Project = Depends(check_for_project_ownership)):
    return await rabbitBroker.sendMessage(str(project.id))


@router.post("/upload/{project_id}")
async def upload_file(files: List[UploadFile], project: Project = Depends(check_for_project_ownership)):
    response = list()
    for file in files:
        result = await handleFile(file)
        response.extend(result)
    for document in response:
        await document.insert()
        project.texts.append(document)
    await project.save(link_rule=WriteRules.WRITE)
    return response


@router.post("/tag/{project_id}", responses={
    status.HTTP_409_CONFLICT: {"description": "Duplicate tag"}
})
async def add_tag(tag: str,  project: Project = Depends(check_for_project_ownership)):
    tag = tag.casefold()
    if(any(x == tag for x in project.data.tags)):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Duplicate tag")
    else:
        project.data.tags.append(tag)
        await project.save()
        return f"Tag created: {tag}"


@router.delete("/tag/{project_id}", responses={
    status.HTTP_404_NOT_FOUND: {"description": "Tag not present in list"}
})
async def delete_tag(tag: str,  project: Project = Depends(check_for_project_ownership)):
    tag = tag.casefold()
    if(any(x == tag for x in project.data.tags)):
        project.data.tags.remove(tag)
        await project.save()
        return f"Tag deleted: {tag}"
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tag not present")
