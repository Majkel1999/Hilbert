import asyncio
import time
from typing import Dict, List

import requests

from model.tokenizer import ModelHandler

SECONDS = 300

API_URL = "http://backend"


class HandlerEntry:
    handler: ModelHandler
    accessTime: float

    def __init__(self, handler: ModelHandler):
        self.handler = handler
        self.accessTime = time.time()


class TokenizerService:
    handlers: Dict[str, HandlerEntry] = {}

    def __init__(self, loop: asyncio.AbstractEventLoop) -> None:
        print("Creating tokenizer service...")
        loop.create_task(self.do_periodic_cleanup(60))

    def get_project_tags(self, projectId: str) -> List[str]:
        response = requests.get(
            f'{API_URL}/data/{projectId}/tags')
        value = response.json()
        return value

    def get_project_dataset(self, projectId: str):
        response = requests.get(
            f'{API_URL}/data/{projectId}/dataset')
        value = response.json()
        return value

    async def get_project_handler(self, projectId: str) -> ModelHandler:
        if(projectId in self.handlers):
            handler = self.handlers[projectId]
            handler.accessTime = time.time()
            return handler.handler
        else:
            try:
                tags = self.get_project_tags(projectId)
                self.handlers[projectId] = HandlerEntry(
                    ModelHandler(projectId, tags))
                return self.handlers[projectId].handler
            except Exception as e:
                print(e)
                return None

    async def classifyText(self, projectId: str, text: str) -> Dict[str, float]:
        handler = await self.get_project_handler(projectId)
        if(handler):
            return handler.classifyText(text)
        else:
            return {}

    async def trainModel(self, projectId: str):
        handler = await self.get_project_handler(projectId)
        try:
            dataset = self.get_project_dataset(projectId)
            handler.trainModel(dataset)
        except Exception as e:
            print(e)
        finally:
            del self.handlers[projectId]

    def cleanup_unused(self):
        currentTime = time.time()
        forDeletion = []
        for key, value in self.handlers.items():
            if(not value.handler.isTraining and currentTime - value.accessTime > SECONDS):
                forDeletion.append(key)
        for key in forDeletion:
            del self.handlers[key]

    async def do_periodic_cleanup(self, interval):
        while True:
            await asyncio.sleep(interval)
            self.cleanup_unused()


loop = asyncio.get_event_loop()
tokenizerService = TokenizerService(loop)
