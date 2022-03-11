from fastapi import FastAPI

from app.database import init_db
from app.routers import projects, projects_data, users

tags_metadata = [
    {
        "name": "Users",
        "description": "Operations related with **users**",
    },
    {
        "name": "Projects",
        "description": "Operations related with **projects**"
    },
    {
        "name": "Project Data",
        "description": "Operations related with **project data**"
    }
]

app = FastAPI(
    title="HIL BERT Trainer API",
    description="*TODO",
    version="0.0.1",
    openapi_tags=tags_metadata
)

app.include_router(users.router)
app.include_router(projects.router)
app.include_router(projects_data.router)


@app.on_event("startup")
async def app_init():
    await init_db()
