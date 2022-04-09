from datetime import datetime, timedelta

from app.models.project_models import Project
from app.models.user_models import Token, TokenData, User
from bson.objectid import ObjectId
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext

SECRET_KEY = "80c3327f78d73bc932a28aa87d484e20e3a1999a2fd1f8e133abf81f924ec8c0"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/user/login/")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


async def get_user(username: str) -> User:
    return await User.find_one(User.username == username)


async def get_user_by_id(id: str) -> User:
    return await User.find_one(User.id == ObjectId(id))


async def authenticate_user(username: str, password: str) -> User:
    user = await get_user(username)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


def create_access_token(user_id: str) -> Token:
    data = {"sub": user_id}
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = data.copy()
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return Token(access_token=encoded_jwt, token_type="bearer")


async def register_user(username: str, password: str, email=None, fullname=None) -> User:
    result = await User.find_one({"username": username})
    if(result is not None):
        return None
    hashed_pw = get_password_hash(password)
    user = User(username=username, email=email,
                full_name=fullname, hashed_password=hashed_pw)
    user = await user.insert()
    return user


async def get_current_active_user(token: str = Depends(oauth2_scheme)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        token_data = TokenData(user_id=user_id)
    except JWTError:
        raise credentials_exception
    user = await get_user_by_id(id=token_data.user_id)
    if not user:
        raise credentials_exception
    return user


async def check_for_project_ownership(project_id: str, user: User = Depends(get_current_active_user)) -> Project:
    project = await Project.find_one(Project.owner == str(user.id), Project.id == ObjectId(project_id))
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
