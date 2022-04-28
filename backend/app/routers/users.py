from app.models.project_models import Project
from app.models.user_models import AccessToken, TokensSet, User, UserOut
from app.routers.projects import removeProject
from app.utility.security import (authenticate_user, create_access_token,
                                  create_token_set, get_current_active_user,
                                  register_user)
from fastapi import APIRouter, Depends, Form, HTTPException, status
from fastapi_jwt_auth import AuthJWT

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
    return create_token_set(user_id=str(user.id), Authorize=Authorize)


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
    return create_access_token(user_id=Authorize.get_jwt_subject(), Authorize=Authorize)


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
