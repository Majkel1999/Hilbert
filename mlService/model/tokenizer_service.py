import asyncio
import time
from typing import Dict, List

import requests

from model.tokenizer import ModelHandler

SECONDS = 300

API_URL = "http://backend"


class HandlerEntry:
    handler: ModelHandler
    accessTime : float

    def __init__(self, handler: ModelHandler):
        self.handler = handler
        self.accessTime = time.time()


handlers: Dict[str, HandlerEntry] = {}


def get_project_tags(projectId: str) -> List[str]:
    response = requests.get(
        f'{API_URL}/data/{projectId}/tags')
    value = response.json()
    return value


def get_project_dataset(projectId: str):
    response = requests.get(
        f'{API_URL}/data/{projectId}/dataset')
    print(response)
    value = response.json()
    print(value)
    return value


async def get_project_handler(projectId: str) -> ModelHandler:
    if(projectId in handlers):
        handler = handlers[projectId]
        handler.accessTime = time.time()
        return handler.handler
    else:
        try:
            tags = get_project_tags(projectId)
            handlers[projectId] = HandlerEntry(ModelHandler(projectId, tags))
            return handlers[projectId].handler
        except Exception as e:
            print(e)
            return None


async def classifyText(projectId: str, text: str) -> Dict[str,float]:
    handler = await get_project_handler(projectId)
    if(handler):
        return handler.classifyText(text)
    else:
        return {}


async def trainModel(projectId: str):
    handler = await get_project_handler(projectId)
    try:
        dataset = get_project_dataset(projectId)
        handler.trainModel(dataset)
    except:
        pass
    finally:
        del handlers[projectId]


def cleanup_unused():
    currentTime = time.time()
    forDeletion = []
    for key, value in handlers.items():
        if(not value.handler.isTraining and currentTime - value.accessTime > SECONDS):
            forDeletion.append(key)
    for key in forDeletion:
        del handlers[key]


async def do_periodic_cleanup(interval):
    while True:
        await asyncio.sleep(interval)
        cleanup_unused()

loop = asyncio.get_event_loop()
loop.create_task(do_periodic_cleanup(60))

