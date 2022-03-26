import asyncio
import aio_pika

RABBIT_HOST = "rabbitmq"
QUEUE_NAME = "model_training"


class RabbitMQHandler:

    def __init__(self):
        self._connection = None
        self._channel = None

    async def init(self):
        print("Initializing RabbitMQ connection", flush=True)
        while(True):
            try:
                self._connection = await aio_pika.connect_robust(host=RABBIT_HOST)
                self._channel = await self._connection.channel()
                await self._channel.declare_queue(QUEUE_NAME)
                print("RabbitMQ connection initialized", flush=True)
                return
            except:
                print('RabbitMQ connection failed. Retrying in 5s...', flush=True)
                await asyncio.sleep(5)

    async def sendMessage(self, body: str, queue_name: str = QUEUE_NAME):
        await self._channel.default_exchange.publish(
            aio_pika.Message(body.encode()),
            routing_key=queue_name
        )

    async def closeConnection(self):
        await self._connection.close()


rabbitBroker = RabbitMQHandler()
