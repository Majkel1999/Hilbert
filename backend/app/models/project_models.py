from typing import Dict, List, Optional

from beanie import Document, Link
from pydantic import BaseModel


class TextDocument(Document):
    value: str
    tags: Dict[str, int]


class MLModel(Document):
    model_data: bytes


class ProjectData(BaseModel):
    texts: List[Link[TextDocument]]
    tags: List[str]
    model: Optional[Link[MLModel]]
    invite_url_postfix: Optional[str]


class Project(Document):
    name: str
    owner: str
    data: ProjectData
