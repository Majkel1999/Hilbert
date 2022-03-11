from datetime import timedelta

from app.models.user_models import Token, User
from app.security import (authenticate_user, create_access_token,
                          get_current_active_user, register_user)
from fastapi import APIRouter, Depends, Form, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

ACCESS_TOKEN_EXPIRE_MINUTES = 30

router = APIRouter(
    prefix="/user",
    tags=["Users"]
)


@router.get("/")
async def get_user_info(current_user: User = Depends(get_current_active_user)):
    delattr(current_user,"hashed_password")
    delattr(current_user,"disabled")
    delattr(current_user,"id")
    return current_user


@router.post("/login", response_model=Token)
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
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/register", status_code=201)
async def register(username: str = Form(...), password: str = Form(...)):
    if(await register_user(username, password)):
        return username
    else:
        raise HTTPException(
            status_code=409,
            detail="Username exists"
        )
