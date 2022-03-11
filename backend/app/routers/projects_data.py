from typing import List

from app.models.project_models import Project
from app.models.request_models import TagRequest
from app.security import get_current_user_projects
from bson.objectid import ObjectId
from fastapi import APIRouter, Depends, HTTPException, UploadFile, status

router = APIRouter(
    prefix="/project/data",
    tags=["Project Data"]
)


@router.post("/upload")
async def upload_file(file: UploadFile):
    return {"filename": file.filename}


@router.post("/tag", status_code=201)
async def add_tag(request: TagRequest, projects: List[Project] = Depends(get_current_user_projects)):
    if(check_for_project_ownership(projects, request.project_id)):
        project = await Project.find_one(Project.id == ObjectId(request.project_id))
        request.tag = request.tag.casefold()
        if(any(x == request.tag for x in project.data.tags)):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Duplicate tag")
        else:
            project.data.tags.append(request.tag)
            await project.save()
            return f"Tag created: {request.tag}"


@router.delete("/tag", status_code=204)
async def delete_tag(request: TagRequest, projects: List[Project] = Depends(get_current_user_projects)):
    if(check_for_project_ownership(projects, request.project_id)):
        project = await Project.find_one(Project.id == ObjectId(request.project_id))
        request.tag = request.tag.casefold()
        if(any(x == request.tag for x in project.data.tags)):
            project.data.tags.remove(request.tag)
            await project.save()
            return f"Tag deleted: {request.tag}"
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Tag not present")


def check_for_project_ownership(projects, project_id):
    if(any(str(x.id) == project_id for x in projects)):
        return True
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Forbidden",
            headers={"WWW-Authenticate": "Bearer"}
        )
