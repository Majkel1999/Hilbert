import asyncio
from typing import Callable
import aio_pika

RABBIT_HOST = "rabbitmq"
QUEUE_NAME = "model_training"


class RabbitMQHandler:

    def __init__(self):
        self._connection = None
        self._channel = None
        self._queue = None

    async def init(self):
        print("Initializing RabbitMQ connection")
        while(True):
            try:
                self._connection = await aio_pika.connect_robust(host=RABBIT_HOST)
                self._channel = await self._connection.channel()
                self._queue = await self._channel.declare_queue(QUEUE_NAME)
                print("RabbitMQ connection initialized")
                return
            except:
                print('RabbitMQ connection failed. Retrying in 5s...')
                await asyncio.sleep(5)

    async def sendMessage(self, body: str, queue_name: str = QUEUE_NAME):
        await self._channel.default_exchange.publish(
            aio_pika.Message(body.encode()),
            routing_key=queue_name
        )

    async def consumeMessages(self, process_message : Callable[[aio_pika.abc.AbstractIncomingMessage],None] ):
        await self._queue.consume(process_message)
        try:
            await asyncio.Future()
        finally:
            await self.closeConnection()

    async def closeConnection(self):
        await self._connection.close()


rabbitBroker = RabbitMQHandler()
