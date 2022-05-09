from typing import Dict
from fastapi import FastAPI
from pydantic import BaseModel

from connectors.rabbitmq_consumer import rabbitConsumer
from model.tokenizer_service import tokenizerService

app = FastAPI(
    docs_url=None,
    redoc_url=None
)


class TextRequest(BaseModel):
    text: str


@app.post("/{project_id}/classify", response_model=Dict[str,float])
async def get(project_id: str, text: TextRequest):
    return await tokenizerService.classifyText(project_id, text.text)

@app.on_event("startup")
async def app_init():
    print("Start rabbit")
    await rabbitConsumer.init()


@app.on_event("shutdown")
async def shutdown():
    await rabbitConsumer.closeConnection()
