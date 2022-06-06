import base64
from typing import List

from app.models.actions import Action
from app.models.project_models import Project, ProjectCreationData
from app.models.user_models import User
from app.utility.security import (check_for_project_ownership,
                                  get_current_active_user)
from app.utility.websocket_manager import wsManager
from fastapi import APIRouter, Depends, HTTPException, status
from passlib.hash import sha256_crypt

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
    for project in userprojects:
        delattr(project,"texts")
    return userprojects


@router.get("/{project_id}", response_model=Project, responses={
    status.HTTP_403_FORBIDDEN: {
        "description": "User not authorized for specific project"}
})
async def get_project(project: Project = Depends(check_for_project_ownership)):
    await project.fetch_all_links()
    return project


@router.post("/", response_model=Project, responses={
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
    project.data.tags.extend([x.casefold() for x in projectCreationData.tags])
    project.is_multi_label = projectCreationData.is_multi_label
    hash = sha256_crypt.hash(str(project.id))
    hashbytes = bytes(hash, 'utf-8')
    project.data.invite_url_postfix = base64.urlsafe_b64encode(
        hashbytes).decode('utf-8').strip('=')
    await project.save()
    return project


@router.delete("/{project_id}", responses={
    status.HTTP_403_FORBIDDEN: {
        "description": "User not authorized for specific project"}
})
async def delete_project(project: Project = Depends(check_for_project_ownership)):
    projectName = await removeProject(project)
    await wsManager.send_by_projectId(Action.ProjectDeleted, str(project.id))
    return projectName + " deleted successfuly"


async def removeProject(project: Project) -> str:
    await project.fetch_all_links()
    for text in project.texts:
        await text.delete()
    projectName = project.name
    await project.delete()
    return projectName
