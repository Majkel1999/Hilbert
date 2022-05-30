import json
import os
import shutil
from typing import Dict, List

import torch
from transformers import (AutoModelForSequenceClassification, AutoTokenizer,
                          DataCollatorWithPadding, Trainer, TrainingArguments, pipeline)

from model.datasets import TextDataset

# Model Arguments

MODEL_NAME = "distilbert-base-uncased"
SAVE_DIR = "/var/results"

# Learning Arguments

LEARNING_RATE = 2e-5
PER_DEVICE_TRAIN_BATCH_SIZE = 1
PER_DEVICE_EVAL_BATCH_SIZE = 1
EPOCHS = 5
WEIGHT_DECAY = 0.01


class ModelHandler:
    projectId: str
    tags: List[str]
    tokenizer: AutoTokenizer
    model: AutoModelForSequenceClassification
    pipe: pipeline
    isTraining: bool = False

    def __init__(self, projectId: str, tags: List[str]):
        self.projectId = projectId
        self.tags = tags
        self.tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
        if(self.checkForModel()):
            self.model = AutoModelForSequenceClassification.from_pretrained(
                f'{SAVE_DIR}/{projectId}')
        else:
            self.model = AutoModelForSequenceClassification.from_pretrained(
                MODEL_NAME, num_labels=len(self.tags),
                id2label={int(v): k for v, k in enumerate(self.tags)},
                label2id={k: int(v) for v, k in enumerate(self.tags)})
        deviceId = -1
        if(torch.cuda.is_available()):
            deviceId = torch.cuda.current_device()
        self.pipe = pipeline('text-classification', self.model,
                             tokenizer=self.tokenizer, device=deviceId)

    def checkForModel(self) -> bool:
        return os.path.isdir(f'{SAVE_DIR}/{self.projectId}')

    def classifyText(self, text: str) -> List[Dict[str, float]]:
        d = self.pipe(text, return_all_scores=True)
        return d[0]

    def trainModel(self, dataset):
        torch.cuda.empty_cache()
        self.isTraining = True
        texts = dataset["texts"]
        labels = dataset["labels"]

        trainDataset = TextDataset(self.tokenizer(texts, truncation=True, padding=True,
                                                  max_length=512,
                                                  return_tensors="pt"), labels)

        data_collator = DataCollatorWithPadding(tokenizer=self.tokenizer)

        training_args = TrainingArguments(
            output_dir=f'./result_{self.projectId}',
            overwrite_output_dir=True,
            learning_rate=LEARNING_RATE,
            per_device_train_batch_size=PER_DEVICE_TRAIN_BATCH_SIZE,
            per_device_eval_batch_size=PER_DEVICE_EVAL_BATCH_SIZE,
            num_train_epochs=EPOCHS,
            weight_decay=WEIGHT_DECAY,
            label_names=self.tags
        )

        trainer = Trainer(
            model=self.model,
            tokenizer=self.tokenizer,
            args=training_args,
            data_collator=data_collator,
            train_dataset=trainDataset
        )
        trainOutput = trainer.train()
        self.model.save_pretrained(f'{SAVE_DIR}/{self.projectId}')
        f = open(f'{SAVE_DIR}/{self.projectId}/metrics.json', 'w')
        f.write(json.dumps(trainOutput))
        f.close()
        try:
            shutil.rmtree(f'./result_{self.projectId}')
        except Exception as e:
            print(e)
            print("Results folder not deleted")
        self.isTraining = False
