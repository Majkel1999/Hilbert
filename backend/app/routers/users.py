from datetime import timedelta

from app.models.user_models import Token, User, UserOut
from app.utility.security import (authenticate_user, create_access_token,
                                  get_current_active_user, register_user)
from fastapi import APIRouter, Depends, Form, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

ACCESS_TOKEN_EXPIRE_MINUTES = 30

router = APIRouter(
    prefix="/user",
    tags=["Users"]
)


@router.get("/", response_model=UserOut, responses={
    status.HTTP_401_UNAUTHORIZED: {"description": "User not authenticated"}
})
async def get_user_info(current_user: User = Depends(get_current_active_user)):
    return current_user


@router.post("/login", response_model=Token, responses={
    status.HTTP_401_UNAUTHORIZED: {
        "description": "Incorrect username or password"}
})
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(
        form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


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
