import os
import shutil
from typing import List

from torch import argmax, tensor
from torch.utils.data import Dataset
from transformers import (AutoModelForSequenceClassification, AutoTokenizer,
                          DataCollatorWithPadding, Trainer, TrainingArguments)
# Model Arguments

TOKENIZER_NAME = "distilbert-base-uncased"
MODEL_NAME = "distilbert-base-uncased"
SAVE_DIR = "/var/results"

# Learning Arguments

LEARNING_RATE=2e-5
PER_DEVICE_TRAIN_BATCH_SIZE=16
PER_DEVICE_EVAL_BATCH_SIZE=16
EPOCHS=100
WEIGHT_DECAY=0.01

class TextDataset(Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels

    def __getitem__(self, idx):
        item = {key: val[idx].clone().detach()
                for key, val in self.encodings.items()}
        item['labels'] = tensor(self.labels[idx])
        return item

    def __len__(self):
        return len(self.labels)


class ModelHandler:
    projectId: str
    tags: List[str]
    tokenizer: AutoTokenizer
    model: AutoModelForSequenceClassification
    isTraining: bool = False

    def __init__(self, projectId: str, tags: List[str]):
        self.projectId = projectId
        self.tags = tags
        self.tokenizer = AutoTokenizer.from_pretrained(TOKENIZER_NAME)
        if(self.checkForModel()):
            self.model = AutoModelForSequenceClassification.from_pretrained(
                f'{SAVE_DIR}/{projectId}', num_labels=len(self.tags))
        else:
            self.model = AutoModelForSequenceClassification.from_pretrained(
                MODEL_NAME, num_labels=len(self.tags))

    def checkForModel(self) -> bool:
        return os.path.isdir(f'{SAVE_DIR}/{self.projectId}')

    def preprocessText(self, data):
        return self.tokenizer(data,
                              padding=True,
                              truncation=True,
                              max_length=512,
                              return_tensors="pt")

    def classifyText(self, text: str) -> str:
        classification = self.model(**self.preprocessText(text))
        return self.tags[argmax(classification.logits)]

    def trainModel(self, dataset):
        self.isTraining = True
        texts = dataset["texts"]
        labels = dataset["labels"]

        train_enc = self.tokenizer(texts, truncation=True, padding=True,
                                   max_length=512,
                                   return_tensors="pt")
        data = TextDataset(train_enc, labels)

        data_collator = DataCollatorWithPadding(tokenizer=self.tokenizer)

        training_args = TrainingArguments(
            output_dir=f'./result_{self.projectId}',
            overwrite_output_dir=True,
            learning_rate=LEARNING_RATE,
            per_device_train_batch_size=PER_DEVICE_TRAIN_BATCH_SIZE,
            per_device_eval_batch_size=PER_DEVICE_EVAL_BATCH_SIZE,
            num_train_epochs=EPOCHS,
            weight_decay=WEIGHT_DECAY,
        )

        trainer = Trainer(
            model=self.model,
            tokenizer=self.tokenizer,
            args=training_args,
            data_collator=data_collator,
            train_dataset=data,
        )
        trainer.train()
        self.model.save_pretrained(f'{SAVE_DIR}/{self.projectId}')
        try:
            shutil.rmtree(f'./result_{self.projectId}')
        except Exception as e:
            print(e)
            print("Results folder not deleted")
        self.isTraining = False
