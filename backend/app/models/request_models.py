from pydantic import BaseModel


class TagRequest(BaseModel):
    tag: str
    text_id : str
