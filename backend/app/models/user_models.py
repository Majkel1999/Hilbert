from typing import Optional
from pydantic import BaseModel, EmailStr
from beanie import Document

class UserOut(Document):
    username: str
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None

class User(UserOut):
    disabled: Optional[bool] = None
    hashed_password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None
