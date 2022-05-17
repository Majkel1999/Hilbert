from typing import List

from app.models.project_models import Project
from app.models.request_models import DatasetResponse, ModelStateRequest
from bson.objectid import ObjectId
from fastapi import APIRouter, HTTPException, status

router = APIRouter(
    prefix="/data",
    tags=["Model service endpoints"],
)


@router.get("/{project_id}/tags",
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


@router.get("/{project_id}/dataset",
            response_model=DatasetResponse,
            responses={
                status.HTTP_400_BAD_REQUEST: {
                    "description": "Project not found"
                }
            })
async def get_dataset(project_id: str):
    exception = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Project not found"
    )
    try:
        project = await Project.find_one(Project.id == ObjectId(project_id))
        await project.fetch_all_links()
        if(not project):
            raise exception
        texts = []
        labels = []
        for text in project.texts:
            if(len(text.tags) > 0):
                texts.append(text.value)
                labels.append(
                    list(map(lambda x: project.data.tags.index(x), text.tags)))
        return DatasetResponse(texts=texts, labels=labels)
    except Exception as e:
        print(e)
        raise exception

@router.post("/{project_id}/modelState")
async def set_model_state(project_id:str, state : ModelStateRequest):
    exception = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Project not found"
    )
    try:
        project = await Project.find_one(Project.id == ObjectId(project_id))
        project.model_state = state.state
        await project.save()
    except Exception as e:
        print(e)
        raise exception