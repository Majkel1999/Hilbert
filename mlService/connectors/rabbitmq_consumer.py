import asyncio
import os

import aio_pika
from model.training_queue import trainingQueue

QUEUE_NAME = "model_training"
RABBITMQ_CONN_STRING = os.environ.get('RABBITMQ_CONN_STRING', False)

if RABBITMQ_CONN_STRING is False:
    raise Exception("RABBITMQ_CONN_STRING env variable is not set")


class RabbitMQHandler:

    def __init__(self):
        self.connection = None
        self.channel = None
        self.queue = None
        self.consumer = None

    async def init(self):
        print("Initializing RabbitMQ connection")
        while(True):
            try:
                self.connection = await aio_pika.connect_robust(RABBITMQ_CONN_STRING)
                self.channel = await self.connection.channel()
                await self.channel.set_qos(1)
                self.queue = await self.channel.declare_queue(QUEUE_NAME)
                self.consumer = await self.queue.consume(self.consumeMessages)
                print("RabbitMQ connection initialized")
                return
            except:
                print('RabbitMQ connection failed. Retrying in 5s...')
                await asyncio.sleep(5)

    async def consumeMessages(self, message: aio_pika.abc.AbstractIncomingMessage):
        async with message.process(ignore_processed=True):
            projectId = message.body.decode()
            trainingQueue.insertItem(projectId)
            await message.ack()

    async def closeConnection(self):
        await self.queue.cancel(self.consumer)
        await self.connection.close()


rabbitConsumer = RabbitMQHandler()
