from typing import List
from pydantic import BaseModel

from app.models.project_models import ProjectData


class TextInfo(BaseModel):
    name: str


class SimpleProjectInfo(BaseModel):
    name: str
    texts: List[TextInfo]
    is_multi_label: bool
    data: ProjectData