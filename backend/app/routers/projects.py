import base64
from typing import List

from app.models.project_models import Project, ProjectCreationData
from app.models.user_models import User
from app.utility.security import get_current_active_user
from fastapi import APIRouter, Depends, HTTPException, status
from passlib.hash import sha256_crypt

from app.utility.security import check_for_project_ownership

router = APIRouter(
    prefix="/project",
    tags=["Projects"],
    responses={
        status.HTTP_401_UNAUTHORIZED: {"description": "User not authenticated"}
    }
)


@router.get("/", response_model=List[Project])
async def get_user_projects(user: User = Depends(get_current_active_user)):
    userprojects = await Project.find(Project.owner == str(user.id), fetch_links=True).to_list()
    return userprojects


@router.post("/create", response_model=Project,responses={
    status.HTTP_409_CONFLICT: {"description": "Project already exists"}
})
async def create_project(projectCreationData: ProjectCreationData, user: User = Depends(get_current_active_user)):
    project = await Project.find_one(Project.owner == str(user.id), Project.name == projectCreationData.name, fetch_links=True)
    if(project is not None):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="You already have a project with that name"
        )
    project = Project(name=projectCreationData.name, owner=str(user.id))
    await project.insert()
    hash = sha256_crypt.hash(str(project.id))
    hashbytes = bytes(hash, 'utf-8')
    project.data.invite_url_postfix = base64.urlsafe_b64encode(
        hashbytes).decode('utf-8').strip('=')
    project.data.tags = projectCreationData.tags
    await project.save()
    return project


@router.delete("/delete/{project_id}",responses={
    status.HTTP_403_FORBIDDEN: {"description": "User not authorized for specific project"}
})
async def delete_project(project: Project = Depends(check_for_project_ownership)):
    if(project.model is not None):
        mlModel = await project.model.fetch()
        await mlModel.delete()
    for text in project.texts:
        document = await text.fetch()
        await document.delete()
    projectName = project.name
    await project.delete()
    return projectName + " deleted successfuly"
