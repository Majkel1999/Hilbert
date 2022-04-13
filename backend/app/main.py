from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.routers import projects, projects_data, tag, users
from app.utility.connectors.database_connector import close_db, init_db
from app.utility.connectors.rabbitmq_connector import rabbitBroker

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
    title="HilBERT Trainer API",
    description="""API for HilBERT application. Project description and source code is avalible at [GitHub](https://github.com/Majkel1999/Hilbert/)""",
    version="0.0.1",
    openapi_tags=tags_metadata,
    root_path="/api/v1",
    servers=[{"url": "/api/v1"}]
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(projects.router)
app.include_router(projects_data.router)
app.include_router(tag.router)


@app.on_event("startup")
async def app_init():
    await init_db()
    await rabbitBroker.init()


@app.on_event("shutdown")
async def shutdown():
    await close_db()
    await rabbitBroker.closeConnection()
