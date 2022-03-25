import asyncio

from aio_pika.abc import AbstractIncomingMessage

from connectors.rabbitmq_connector import rabbitBroker


async def on_message(message: AbstractIncomingMessage) -> None:
    print(" [x] Received message %r" % message)
    print("Message body is: %r" % message.body.decode())
    await message.ack()


async def main() -> None:
    await rabbitBroker.init()
    await rabbitBroker.consumeMessages(on_message)


if __name__ == "__main__":
    asyncio.run(main())