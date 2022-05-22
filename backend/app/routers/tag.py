import random
from typing import Union
from uuid import uuid4

import requests

from app.models.project_models import (Project, ProjectOut, TextDocument,
                                       TextOut)
from app.models.request_models import TagRequest
from app.utility.security import check_invite_url
from bson.objectid import ObjectId
from fastapi import APIRouter, Cookie, Depends, HTTPException, Response, status

from app.models.user_models import TaggedText, Tagger

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
async def get_random_text(response: Response, tagging_id: Union[str, None] = Cookie(default=None),
                          predict: bool = False, project: Project = Depends(check_invite_url)):
    response.set_cookie(key="tagging_id",
                        value=tagging_id if tagging_id else uuid4(),
                        max_age=3000000)
    try:
        texts = [x for x in project.texts if len(x.tags) == 0]
        document: TextDocument = random.choice(texts)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            detail="All texts have been tagged"
        )
    tag = None
    if(predict and project.model_state == 'Trained'):
        try:
            response = requests.post(f'{MLService_URL}/{str(project.id)}/classify',
                                     json={"text": document.value},
                                     timeout=10)
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
async def tag_text(response: Response, request: TagRequest,
                   tagging_id: Union[str, None] = Cookie(default=None), project: Project = Depends(check_invite_url)):
    if(len(request.tags) == 0):
        raise HTTPException(400, "Tag array cannot be empty"
                            )

    if(not project.is_multi_label and len(request.tags) > 1):
        raise HTTPException(400, "Multiple tags in a single label project")

    try:
        textId = ObjectId(request.text_id)
    except:
        raise HTTPException(400, "Text not found")

    if(not any(x.id == textId for x in project.texts)):
        raise HTTPException(401, "Invite link not matching document")

    for tag in request.tags:
        tag = tag.casefold()
        if(not any(projectTag.casefold() == tag for projectTag in project.data.tags)):
            raise HTTPException(
                405, f'Tag: - {tag} - does not exist in project')
    text = await TextDocument.find_one(TextDocument.id == textId)
    if(len(text.tags) != 0):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Text already tagged"
        )
    uuid = tagging_id
    if(uuid is None):
        uuid = str(uuid4())
    response.set_cookie(key="tagging_id", value=uuid, max_age=3000000)

    tagger = await Tagger.find_one(Tagger.identifier == uuid)
    if(tagger is None):
        tagger = Tagger(identifier=uuid)
    tagger.tagged.append(TaggedText(
        text_id=request.text_id, tags=request.tags))
    text.tags = request.tags
    await text.save()
    await tagger.save()
    return text
