from pydantic import BaseModel


class TagRequest(BaseModel):
    tag: str
