from datetime import timedelta

from app.models.project_models import Project
from app.models.user_models import AccessToken, TokensSet, User, UserOut
from app.routers.projects import removeProject
from app.utility.security import (authenticate_user, get_current_active_user,
                                  register_user)
from fastapi import APIRouter, Depends, Form, HTTPException, status
from fastapi_jwt_auth import AuthJWT

ACCESS_TOKEN_EXPIRE = timedelta(minutes=30)
REFRESH_TOKEN_EXPIRE = timedelta(days=30)

router = APIRouter(
    prefix="/user",
    tags=["Users"]
)


@router.get("/", response_model=UserOut, responses={
    status.HTTP_401_UNAUTHORIZED: {"description": "User not authenticated"}
})
async def get_user_info(current_user: User = Depends(get_current_active_user)):
    return current_user


@router.post("/login", response_model=TokensSet, responses={
    status.HTTP_401_UNAUTHORIZED: {
        "description": "Incorrect username or password"}
})
async def login(username: str = Form(...), password: str = Form(...), Authorize: AuthJWT = Depends()):
    user = await authenticate_user(username, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = Authorize.create_access_token(
        subject=str(user.id), expires_time=ACCESS_TOKEN_EXPIRE)
    refresh_token = Authorize.create_refresh_token(
        subject=str(user.id), expires_time=REFRESH_TOKEN_EXPIRE)
    return TokensSet(access_token=access_token,
                     refresh_token=refresh_token, token_type="Bearer")


@router.post("/refresh", response_model=AccessToken, responses={
    status.HTTP_401_UNAUTHORIZED: {
        "description": "Refresh token not present or expired"}
})
async def refresh(Authorize: AuthJWT = Depends()):
    try:
        Authorize.jwt_refresh_token_required()
    except:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Refresh token not present or expired")
    user_id = Authorize.get_jwt_subject()
    return AccessToken(access_token=Authorize.create_access_token(subject=user_id, expires_time=ACCESS_TOKEN_EXPIRE), token_type="Bearer")


@router.post("/register", response_model=UserOut, responses={
    status.HTTP_409_CONFLICT: {"description": "Username already exists"}
})
async def register(username: str = Form(...), password: str = Form(...)):
    registeredUser = await register_user(username, password)
    if(registeredUser):
        return registeredUser
    else:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username exists"
        )


@router.delete("/")
async def delete_user(user: User = Depends(get_current_active_user)):
    userprojects = await Project.find(Project.owner == str(user.id), fetch_links=True).to_list()
    for project in userprojects:
        await removeProject(project)
    await user.delete()
    return 'User deleted'
