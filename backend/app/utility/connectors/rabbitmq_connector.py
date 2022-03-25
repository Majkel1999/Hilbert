import asyncio
import aio_pika


class RabbitMQHandler:
    RABBIT_HOST = "rabbitmq"
    QUEUE_NAME = "model_training"

    def __init__(self):
        self._connection = None
        self._channel = None

    async def init(self):
        while(True):
            try:
                self._connection = await aio_pika.connect_robust(host=self.RABBIT_HOST)
                self._channel = await self._connection.channel()
                await self._channel.declare_queue(self.QUEUE_NAME)
                return
            except:
                print('RabbitMQ connection failed. Retrying in 5s...')
                await asyncio.sleep(5)

    async def sendMessage(self, body: str):
        await self._channel.default_exchange.publish(
            aio_pika.Message(body.encode()),
            routing_key=self.QUEUE_NAME
        )

    async def closeConnection(self):
        await self._connection.close()


rabbitBroker = RabbitMQHandler()
