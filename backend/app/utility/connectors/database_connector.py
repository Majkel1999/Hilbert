import os

from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from app.models.project_models import MLModel, Project, TextDocument
from app.models.user_models import User


class Database:
    client: AsyncIOMotorClient = None


DB_CONN_STRING = os.environ.get('DB_CONN_STRING', False)

if DB_CONN_STRING is False:
    DB_CONN_STRING = "mongodb://root:root@localhost:27017"

db = Database()


async def init_db():
    print("Initializing database connection", flush=True)
    db.client = AsyncIOMotorClient(DB_CONN_STRING)
    await init_beanie(db.client.test, document_models=[User, Project, TextDocument, MLModel])
    print("Database connection initialized", flush=True)


async def close_db():
    db.client.close()
