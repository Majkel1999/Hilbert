from typing import Dict, List, Optional

from beanie import Document, Link
from pydantic import BaseModel


class TextDocument(Document):
    name: str
    value: str
    tags: Dict[str, int] = dict()


class MLModel(Document):
    model_data: bytes


class ProjectData(BaseModel):
    tags: List[str] = list()
    invite_url_postfix: Optional[str]


class Project(Document):
    name: str
    owner: str
    texts: List[Link[TextDocument]] = list()
    model: Optional[Link[MLModel]]
    data: ProjectData = ProjectData()
