import random

from app.models.project_models import ProjectOut, Project, TextDocument
from app.models.request_models import TagRequest
from app.utility.security import check_invite_url
from bson.objectid import ObjectId
from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter(
    prefix="/tag",
    tags=["Tag"]
)


@router.get("/{invite_url}", response_model=ProjectOut)
async def get_project_info(project: Project = Depends(check_invite_url)):
    return project


@router.get("/{invite_url}/text", response_model=TextDocument)
async def get_random_text(project: Project = Depends(check_invite_url)):
    try:
        return random.choice([x for x in project.texts if x.tag is None])
    except:
        return "All texts have been tagged"


@router.post("/{invite_url}/tag", response_model=str)
async def tag_text(request: TagRequest, project: Project = Depends(check_invite_url)):
    if(not any(x.id == ObjectId(request.text_id) for x in project.texts)):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invite link not matching document"
        )
    else:
        text = await TextDocument.find_one(TextDocument.id == ObjectId(request.text_id))
        if(text.tag is not None):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Text already tagged"
            )
        text.tag = request.tag
        await text.save()
        return text.tag
