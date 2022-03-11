from typing import List

from beanie import WriteRules

from app.models.project_models import Project
from app.models.request_models import TagRequest
from app.utility.file_helper import handleFile
from app.utility.security import check_for_project_ownership

from fastapi import APIRouter, Depends, HTTPException, UploadFile, status


router = APIRouter(
    prefix="/project/data",
    tags=["Project Data"]
)


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


@router.post("/tag/{project_id}", status_code=201)
async def add_tag(request: TagRequest,  project: Project = Depends(check_for_project_ownership)):
    request.tag = request.tag.casefold()
    if(any(x == request.tag for x in project.data.tags)):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Duplicate tag")
    else:
        project.data.tags.append(request.tag)
        await project.save()
        return f"Tag created: {request.tag}"


@router.delete("/tag/{project_id}", status_code=204)
async def delete_tag(request: TagRequest,  project: Project = Depends(check_for_project_ownership)):
    request.tag = request.tag.casefold()
    if(any(x == request.tag for x in project.data.tags)):
        project.data.tags.remove(request.tag)
        await project.save()
        return f"Tag deleted: {request.tag}"
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tag not present")
