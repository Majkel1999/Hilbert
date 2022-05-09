import asyncio
import os

import aio_pika
from model.tokenizer_service import trainModel

QUEUE_NAME = "model_training"
RABBITMQ_CONN_STRING = os.environ.get('RABBITMQ_CONN_STRING', False)

if RABBITMQ_CONN_STRING is False:
    raise Exception("RABBITMQ_CONN_STRING env variable is not set")

class RabbitMQHandler:

    def __init__(self):
        self._connection = None
        self._channel = None
        self._queue = None
        self._task = None

    async def init(self):
        print("Initializing RabbitMQ connection")
        while(True):
            try:
                self._connection = await aio_pika.connect_robust(RABBITMQ_CONN_STRING)
                self._channel = await self._connection.channel()
                await self._channel.set_qos(1)
                self._queue = await self._channel.declare_queue(QUEUE_NAME)
                loop = asyncio.get_event_loop()
                self._task = loop.create_task(self.consumeMessages())
                print("RabbitMQ connection initialized")
                return
            except:
                print('RabbitMQ connection failed. Retrying in 5s...')
                await asyncio.sleep(5)

    async def consumeMessages(self):
        try:
            while True:
                if (message := await self._queue.get(fail=False)):
                    async with message.process(ignore_processed=True):
                        await message.ack()
                        projectId = message.body.decode()
                        loop = asyncio.get_event_loop()
                        loop.create_task(train_model_and_check_queue(projectId))
                        self._task.cancel()
                else:
                    print("Queue empty")
                await asyncio.sleep(5)
        except Exception as e:
            print(e)
            print("Conn closed?")

    async def closeConnection(self):
        if(not self._task.cancelled()):
            self._task.cancel()
        await self._connection.close()

async def train_model_and_check_queue(projectId:str):
    await trainModel(projectId)
    loop = asyncio.get_event_loop()
    rabbitBroker._task = loop.create_task(rabbitBroker.consumeMessages())

rabbitBroker = RabbitMQHandler()
