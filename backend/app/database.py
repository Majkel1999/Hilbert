from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from app.models.project_models import Project

from app.models.user_models import User

DB_CONN_STRING = "mongodb://root:root@localhost:8001"

async def init_db():
    print("Initializing database connection")
    client = AsyncIOMotorClient(DB_CONN_STRING)
    await init_beanie(client.test, document_models=[User,Project])
