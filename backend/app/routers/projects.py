import base64
from typing import List

from app.models.project_models import Project, ProjectOut
from app.models.user_models import User
from app.utility.security import get_current_active_user
from fastapi import APIRouter, Depends, Form, HTTPException
from passlib.hash import sha256_crypt

router = APIRouter(
    prefix="/project",
    tags=["Projects"]
)


@router.get("/", response_model=List[ProjectOut])
async def get_user_projects(user: User = Depends(get_current_active_user)):
    userprojects = await Project.find(Project.owner == str(user.id), fetch_links=True).to_list()
    return userprojects


@router.post("/create", response_model=ProjectOut)
async def create_project(name: str = Form(...), user: User = Depends(get_current_active_user)):
    project = await Project.find_one(Project.owner == str(user.id), Project.name == name, fetch_links=True)
    if(project is not None):
        raise HTTPException(
            status_code=409,
            detail="You already have a project with that name"
        )
    project = Project(name=name, owner=str(user.id))
    await project.insert()
    hash = sha256_crypt.hash(str(project.id))
    hashbytes = bytes(hash, 'utf-8')
    project.data.invite_url_postfix = base64.urlsafe_b64encode(
        hashbytes).decode('utf-8')
    await project.save()
    return project
