import asyncio
from queue import Queue, Empty
import threading
from model.tokenizer_service import tokenizerService


class UniqueQueue(Queue):
    def _init(self, maxsize: int) -> None:
        self.set = set()
        return super()._init(maxsize)

    def _put(self, item):
        if(item not in self.set):
            self.set.add(item)
            self.queue.append(item)

    def _get(self):
        return self.queue.popleft()

    def confirm(self, item):
        self.set.remove(item)


class QueueConsumer(threading.Thread):
    queue: UniqueQueue = None

    def __init__(self, queue: UniqueQueue):
        super(QueueConsumer, self).__init__()
        self.queue = queue
        return

    def run(self):
        asyncio.run(self.processItemsPeriodically())

    async def processItemsPeriodically(self):
        while(True):
            await self.processQueue()
            await asyncio.sleep(10)

    async def processQueue(self):
        if not self.queue.empty():
            try:
                item = self.queue.get()
            except Empty:
                return
            print(f'Training model for project {item}')
            await tokenizerService.trainModel(item)
            self.queue.confirm(item)


class TrainingQueue:
    consumer: QueueConsumer = None
    queue: UniqueQueue = UniqueQueue(-1)

    def __init__(self) -> None:
        print("Creating training queue...")
        self.consumer = QueueConsumer(self.queue)
        self.consumer.start()

    def insertItem(self, item: str):
        self.queue.put(item)


trainingQueue = TrainingQueue()
