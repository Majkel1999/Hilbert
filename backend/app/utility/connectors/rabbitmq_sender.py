import asyncio
import os
import aio_pika


QUEUE_NAME = "model_training"

RABBITMQ_CONN_STRING = os.environ.get('RABBITMQ_CONN_STRING', False)

if RABBITMQ_CONN_STRING is False:
    raise Exception("RABBITMQ_CONN_STRING env variable is not set")

class RabbitMQHandler:

    def __init__(self):
        self._connection = None
        self._channel = None

    async def init(self):
        print("Initializing RabbitMQ connection")
        while(True):
            try:
                self._connection: aio_pika.RobustConnection = await aio_pika.connect_robust(RABBITMQ_CONN_STRING)
                self._channel: aio_pika.RobustChannel = await self._connection.channel()
                await self._channel.declare_queue(QUEUE_NAME)
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

    async def closeConnection(self):
        await self._channel.close()
        await self._connection.close()


rabbitBroker = RabbitMQHandler()
