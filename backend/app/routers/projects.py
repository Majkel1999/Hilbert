from app.models.project_models import Project
from app.models.user_models import User
from app.utility.security import get_current_active_user
from fastapi import APIRouter, Depends, Form, HTTPException
from passlib.hash import sha256_crypt

router = APIRouter(
    prefix="/project",
    tags=["Projects"]
)


@router.get("/")
async def get_user_projects(user: User = Depends(get_current_active_user)):
    user_projects = await Project.find(Project.owner == str(user.id)).to_list()
    for project in user_projects:
        delattr(project, "owner")
    return user_projects


@router.post("/create")
async def create_project(name: str = Form(...), user: User = Depends(get_current_active_user)):
    project = await Project.find_one(Project.owner == str(user.id), Project.name == name)
    if(project is not None):
        raise HTTPException(
            status_code=409,
            detail="You already have a project with that name"
        )
    project = Project(name=name, owner=str(user.id))
    await project.insert()
    hash = str(sha256_crypt.hash(str(project.id)))
    hash = hash.split("=")[1]
    project.data.invite_url_postfix = hash
    await project.save()
    return project
