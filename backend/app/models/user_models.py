from typing import Optional

from beanie import Document
from pydantic import BaseModel, EmailStr


class UserOut(BaseModel):
    username: str
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None


class User(Document, UserOut):
    hashed_password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None
