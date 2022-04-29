import os
from typing import List

from datasets import load_dataset
from torch import argmax
from transformers import (AutoModelForSequenceClassification, AutoTokenizer,
                          DataCollatorWithPadding, Trainer, TrainingArguments)

TOKENIZER_NAME = "distilbert-base-uncased"
MODEL_NAME = "distilbert-base-uncased"

text = "Unions representing workers at Turner   Newall say they are 'disappointed' after talks with stricken parent firm Federal Mogul."

class ModelHandler:
    projectId: str
    tags: List[str]
    tokenizer: AutoTokenizer
    model: AutoModelForSequenceClassification

    def __init__(self, projectId: str, tags: List[str]):
        self.projectId = projectId
        self.tags = tags
        self.tokenizer = AutoTokenizer.from_pretrained(TOKENIZER_NAME)
        if(self.checkForModel()):
            self.model = AutoModelForSequenceClassification.from_pretrained(
                f'./{projectId}', num_labels=len(self.tags))
        else:
            self.model = AutoModelForSequenceClassification.from_pretrained(
                MODEL_NAME, num_labels=len(self.tags))

    def checkForModel(self) -> bool:
        return os.path.isdir(f'./{self.projectId}')

    def preprocessText(self, text):
        return self.tokenizer(text,
                              padding=True,
                              truncation=True,
                              max_length=512,
                              return_tensors="pt")

    def classifyText(self, text: str) -> str:
        classification =  self.model(**self.preprocessText(text))
        return self.tags[argmax(classification.logits)]

    def trainModel(self):
        trainDataset = load_dataset('csv', data_files='train.csv')
        testDataset = load_dataset('csv', data_files='test.csv')

        tokenized_train = trainDataset.map(self.preprocessText, batched=True)
        tokenized_test = testDataset.map(self.preprocessText, batched=True)

        data_collator = DataCollatorWithPadding(tokenizer=self.tokenizer)

        training_args = TrainingArguments(
            learning_rate=2e-5,
            per_device_train_batch_size=16,
            per_device_eval_batch_size=16,
            num_train_epochs=2,
            weight_decay=0.01,
        )

        trainer = Trainer(
            model=self.model,
            tokenizer=self.tokenizer,
            args=training_args,
            data_collator=data_collator,
            train_dataset=tokenized_train['train'],
            eval_dataset=tokenized_test['train'],
        )
        trainer.train()
        self.model.save_pretrained(f'./{self.projectId}')


handler = ModelHandler("123", ["wiosna", "lato", "jesień", "zima", "dupa"])
print(handler.classifyText(text))
#handler.trainModel()
