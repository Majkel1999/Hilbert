import os

from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from app.models.project_models import MLModel, Project, TextDocument
from app.models.user_models import User

DB_CONN_STRING = os.environ.get('DB_CONN_STRING', False)

if DB_CONN_STRING is False:
    DB_CONN_STRING = "mongodb://root:root@localhost:8001"


async def init_db():
    print("Initializing database connection")
    client = AsyncIOMotorClient(DB_CONN_STRING)
    await init_beanie(client.test, document_models=[User, Project, TextDocument, MLModel])