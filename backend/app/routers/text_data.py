from typing import List

from app.models.project_models import Project
from app.models.request_models import DataEntry, DatasetResponse
from bson.objectid import ObjectId
from fastapi import APIRouter, HTTPException, status

router = APIRouter(
    prefix="/data",
    tags=["Text data"],
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
        for text in project.texts:
            texts.append(DataEntry(text=text.value, label=list(map(
                lambda x: project.data.tags.index(x), text.tags))))
        return DatasetResponse(tags=project.data.tags, data=texts)
    except Exception as e:
        print(e)
        raise exception
