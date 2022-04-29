from typing import List
from pydantic import BaseModel


class Tag(BaseModel):
    tag: str


class TagRequest(BaseModel):
    text_id: str
    tags: List[str]


class FileDeleteRequest(BaseModel):
    file_id: str


class DataEntry(BaseModel):
    text: str
    label: List[int]


class DatasetResponse(BaseModel):
    tags: List[str]
    data: List[DataEntry]
