import random

import requests

from app.models.project_models import (Project, ProjectOut, TextDocument,
                                       TextOut)
from app.models.request_models import TagRequest
from app.utility.security import check_invite_url
from bson.objectid import ObjectId
from fastapi import APIRouter, Depends, HTTPException, status

MLService_URL = "http://mlService"

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
    status.HTTP_400_BAD_REQUEST: {
        "description": "MLService is offline or not responding"}
})
async def get_random_text(predict: bool = False, project: Project = Depends(check_invite_url)):
    try:
        texts = [x for x in project.texts if len(x.tags) == 0]
        document: TextDocument = random.choice(texts)
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            detail="All texts have been tagged"
        )
    tag = None
    if(predict):
        try:
            response = requests.post(f'{MLService_URL}/{str(project.id)}/classify',
                                    json={"text": document.value},
                                     timeout=5)
            if(not response.status_code == 200):
                raise Exception()
            tag = response.json()
            print(tag)
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="MLService is offline or not responding"
            )
    return TextOut(id=document.id, name=document.name, value=document.value, possible_tags=project.data.tags, preferredTag=tag)

@router.post("/{invite_url}/tag", response_model=TextDocument,    responses={
    status.HTTP_400_BAD_REQUEST: {"description": "Tag array cannot be empty or multiple tags in single-label project or text not found"},
    status.HTTP_401_UNAUTHORIZED: {"description": "Invite link not matching document"},
    status.HTTP_406_NOT_ACCEPTABLE: {"description": "Tag doesn't exist in project"},
    status.HTTP_409_CONFLICT: {"description": "Text already tagged"},
})
async def tag_text(request: TagRequest, project: Project = Depends(check_invite_url)):
    if(len(request.tags) == 0):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Tag array cannot be empty"
        )

    if(not project.is_multi_label and len(request.tags) > 1):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Multiple tags in a single label project"
        )

    try:
        textId = ObjectId(request.text_id)
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Text not found"
        )

    if(not any(x.id == textId for x in project.texts)):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invite link not matching document"
        )

    for tag in request.tags:
        tag = tag.casefold()
        if(not any(projectTag.casefold() == tag for projectTag in project.data.tags)):
            raise HTTPException(
                status_code=status.HTTP_406_NOT_ACCEPTABLE,
                detail=f'Tag: - {tag} - does not exist in project'
            )

    text = await TextDocument.find_one(TextDocument.id == textId)
    if(len(text.tags) != 0):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Text already tagged"
        )
    text.tags = request.tags
    await text.save()
    return text
