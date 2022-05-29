from typing import List, Optional

from beanie import Document
from pydantic import BaseModel, EmailStr


class TaggedText(BaseModel):
    text_id: str
    tags: List[str]


class Tagger(Document):
    identifier: str
    tagged: List[TaggedText] = list()


class UserOut(BaseModel):
    username: str
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None


class User(Document, UserOut):
    hashed_password: str


class UserForm(BaseModel):
    username: str
    password: str


class AccessToken(BaseModel):
    access_token: str
    token_type: str


class TokensSet(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str


class TokenData(BaseModel):
    user_id: Optional[str] = None
