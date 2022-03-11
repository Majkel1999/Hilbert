from pydantic import BaseModel


class TagRequest(BaseModel):
    tag: str
    project_id: str
