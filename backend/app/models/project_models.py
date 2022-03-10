from beanie import Document


class Project(Document):
    name: str
    owner: str
