from fastapi import FastAPI
from pydantic import BaseModel
from services.handler_service import classifyText
from connectors.rabbitmq_consumer import rabbitBroker

app = FastAPI()


class TextRequest(BaseModel):
    text: str


@app.post("/{project_id}/classify")
async def get(project_id: str, text: TextRequest):
    return await classifyText(project_id, text.text)

@app.on_event("startup")
async def app_init():
    await rabbitBroker.init()


@app.on_event("shutdown")
async def shutdown():
    await rabbitBroker.closeConnection()
