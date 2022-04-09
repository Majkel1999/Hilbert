from pydantic import BaseModel

class Tag(BaseModel):
    tag:str
class TagRequest(Tag):
    text_id : str

