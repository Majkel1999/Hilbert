from typing import List

from pydantic import BaseModel


class Tag(BaseModel):
    tag: str


class TagRequest(BaseModel):
    text_id: str
    tags: List[str]


class FileDeleteRequest(BaseModel):
    file_id: str


class DatasetResponse(BaseModel):
    labels: List[List[int]]
    texts: List[str]
