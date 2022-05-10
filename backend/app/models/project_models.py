from typing import Dict, List, Optional

from beanie import Document, Link
from pydantic import BaseModel


class TextDocument(Document):
    name: str
    value: str
    tags: List[str] = list()


class TextOut(TextDocument):
    possible_tags: List[str]
    preferredTag: Dict[str, float] = None


class ProjectData(BaseModel):
    tags: List[str] = list()
    invite_url_postfix: str = None


class ProjectOut(BaseModel):
    name: str
    texts: List[Link[TextDocument]] = list()
    data: ProjectData = ProjectData()
    is_multi_label: bool = False


class Project(Document, ProjectOut):
    owner: str


class ProjectCreationData(BaseModel):
    name: str
    tags: List[str] = list()
    is_multi_label: bool = False
