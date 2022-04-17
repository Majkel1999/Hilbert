from typing import List, Optional

from beanie import Document, Link
from pydantic import BaseModel


class TextDocument(Document):
    name: str
    value: str
    tag: Optional[str]

class TextOut(TextDocument):
    tags: List[str]
    preferredTag: Optional[str] = None


class MLModel(Document):
    model_data: bytes


class ProjectData(BaseModel):
    tags: List[str] = list()
    invite_url_postfix: str = None


class ProjectOut(BaseModel):
    name: str
    texts: List[Link[TextDocument]] = list()
    data: ProjectData = ProjectData()


class Project(Document, ProjectOut):
    owner: str
    model: Optional[Link[MLModel]]
    is_multi_label : bool = False


class ProjectCreationData(BaseModel):
    name: str
    tags: List[str] = list()
    is_multi_label : bool = False
