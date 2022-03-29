import random
from unicodedata import name

from app.models.project_models import (Project, ProjectOut, TextDocument,
                                       TextOut)
from app.models.request_models import TagRequest
from app.utility.security import check_invite_url
from bson.objectid import ObjectId
from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter(
    prefix="/tag",
    tags=["Tag"],
    responses={
        status.HTTP_403_FORBIDDEN: {"description": "Invite link not valid"},
    }
)


@router.get("/{invite_url}", response_model=ProjectOut)
async def get_project_info(project: Project = Depends(check_invite_url)):
    return project


@router.get("/{invite_url}/text", response_model=TextOut, responses={
    status.HTTP_406_NOT_ACCEPTABLE: {"description": "All texts in project are tagged"},
})
async def get_random_text(project: Project = Depends(check_invite_url)):
    try:
        texts = [x for x in project.texts if x.tag is None]
        document: TextDocument = random.choice(texts)
        return TextOut(id=document.id, name=document.name, value=document.value, tags=project.data.tags)
    except:
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            detail="All texts have been tagged"
        )


@router.post("/{invite_url}/tag", response_model=str,    responses={
    status.HTTP_401_UNAUTHORIZED: {"description": "Invite link not matching document"},
    status.HTTP_406_NOT_ACCEPTABLE: {"description": "Tag doesn't exist in project"},
    status.HTTP_409_CONFLICT: {"description": "Text already tagged"},
})
async def tag_text(request: TagRequest, project: Project = Depends(check_invite_url)):
    if(not any(x.id == ObjectId(request.text_id) for x in project.texts)):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invite link not matching document"
        )
    elif(not any(tag == request.tag for tag in project.data.tags)):
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            detail="Tag doesn't exist in project"
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
