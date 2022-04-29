import asyncio
from tagger.tokenizer import ModelHandler
from connectors.rabbitmq_connector import rabbitBroker

async def main() -> None:
    print(f'MLService starting')


if __name__ == "__main__":
    asyncio.run(main())
