from datetime import timedelta

from app.models.project_models import Project
from app.models.user_models import AccessToken, TokensSet, User
from bson.objectid import ObjectId
from fastapi import Depends, HTTPException, status
from fastapi_jwt_auth import AuthJWT
from passlib.context import CryptContext
from pydantic import BaseModel

SECRET_KEY = "80c3327f78d73bc932a28aa87d484e20e3a1999a2fd1f8e133abf81f924ec8c0"
ACCESS_TOKEN_EXPIRE = timedelta(minutes=30)
REFRESH_TOKEN_EXPIRE = timedelta(days=30)


class Settings(BaseModel):
    authjwt_secret_key: str = SECRET_KEY


@AuthJWT.load_config
def get_config():
    return Settings()


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


async def get_user(username: str) -> User:
    return await User.find_one(User.username == username)


async def get_user_by_id(id: str) -> User:
    try:
        return await User.find_one(User.id == ObjectId(id))
    except:
        return None


def create_access_token(user_id: str, Authorize: AuthJWT) -> AccessToken:
    access_token = Authorize.create_access_token(
        subject=user_id, expires_time=ACCESS_TOKEN_EXPIRE)
    return AccessToken(access_token=access_token, token_type='Bearer')


def create_token_set(user_id: str, Authorize: AuthJWT) -> TokensSet:
    access_token = Authorize.create_access_token(
        subject=user_id, expires_time=ACCESS_TOKEN_EXPIRE)
    refresh_token = Authorize.create_refresh_token(
        subject=user_id, expires_time=REFRESH_TOKEN_EXPIRE)
    return TokensSet(access_token=access_token,
                     refresh_token=refresh_token,
                     token_type='Bearer')


async def authenticate_user(username: str, password: str) -> User:
    user = await get_user(username)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


async def register_user(username: str, password: str, email=None, fullname=None) -> User:
    result = await User.find_one({"username": username})
    if(result is not None):
        return None
    hashed_pw = get_password_hash(password)
    user = User(username=username, email=email,
                full_name=fullname, hashed_password=hashed_pw)
    user = await user.insert()
    return user


async def get_current_active_user(Authorize: AuthJWT = Depends()) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )

    try:
        Authorize.jwt_required()
    except:
        raise credentials_exception

    user_id = Authorize.get_jwt_subject()
    if user_id is None:
        raise credentials_exception
    user = await get_user_by_id(id=user_id)
    if not user:
        raise credentials_exception
    return user


async def check_for_project_ownership(project_id: str, user: User = Depends(get_current_active_user)) -> Project:
    try:
        project = await Project.find_one(Project.owner == str(user.id), Project.id == ObjectId(project_id))
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Project not found by Id"
        )
    if(project):
        return project
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Forbidden",
            headers={"WWW-Authenticate": "Bearer"}
        )


async def check_invite_url(invite_url: str) -> Project:
    project = await Project.find_one(Project.data.invite_url_postfix == invite_url, fetch_links=True)
    if(project):
        return project
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invite link not matching any project"
        )
