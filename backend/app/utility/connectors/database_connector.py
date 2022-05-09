import os

from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from app.models.project_models import MLModel, Project, TextDocument
from app.models.user_models import User


class Database:
    client: AsyncIOMotorClient = None


DB_CONN_STRING = os.environ.get('DB_CONN_STRING', False)

if DB_CONN_STRING is False:
    raise Exception("DB_CONN_STRING env variable is not set")

db = Database()


async def init_db():
    print("Initializing database connection")
    db.client = AsyncIOMotorClient(DB_CONN_STRING)
    await init_beanie(db.client.test, document_models=[User, Project, TextDocument, MLModel])
    print("Database connection initialized")


async def close_db():
    db.client.close()
