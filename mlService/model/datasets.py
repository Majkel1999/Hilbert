from torch import tensor
from torch.utils.data import Dataset

TOKENIZER_MAX_LENGTH = 512


def createDatasets(tokens, labels, tokenizer, test_split: float = 0.25):
    length = len(tokens)
    div = int(length*(1-test_split))

    trainTokens = tokens[:div]
    trainLabels = labels[:div]
    testTokens = tokens[div:]
    testLabels = labels[div:]

    trainDataset = TextDataset(tokenizer(trainTokens, truncation=True, padding=True,
                                         max_length=TOKENIZER_MAX_LENGTH,
                                         return_tensors="pt"), trainLabels)
    testDataset = TextDataset(tokenizer(testTokens, truncation=True, padding=True,
                                        max_length=TOKENIZER_MAX_LENGTH,
                                        return_tensors="pt"), testLabels)
    return trainDataset, testDataset


class TextDataset(Dataset):
    def __init__(self, tokens, labels):
        self.tokens = tokens
        self.labels = labels

    def __getitem__(self, idx):
        item = {key: val[idx].clone().detach()
                for key, val in self.tokens.items()}
        item['labels'] = tensor(self.labels[idx])
        return item

    def __len__(self):
        return len(self.labels)