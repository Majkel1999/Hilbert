# Model BERT i tokenizator

---

Modele i tokenizatory użyte w projekcie pochodzą ze strony [HuggingFace](https://huggingface.co/models). 
Domyślnie użytym modelem jest [distilbert-base-uncased](https://huggingface.co/distilbert-base-uncased).

### Parametry
Domyślne wartości parametrów użyte do treningu zostały przedstawione poniżej. Można je zmienić w zależności od potrzeb a także dostępnych zasobów. Zostały zdefiniowane w pliku [tokenizer.py](https://raw.githubusercontent.com/Majkel1999/Hilbert/master/mlService/model/tokenizer.py).
```python
LEARNING_RATE = 2e-5
PER_DEVICE_TRAIN_BATCH_SIZE = 1
PER_DEVICE_EVAL_BATCH_SIZE = 1
EPOCHS = 5
WEIGHT_DECAY = 0.01
TOKENIZER_MAX_LENGTH = 512
```

Parametry te powinny zostać zmienione zgodnie z możliwościami technicznymi urządzenia, na którym działa instancja. Największym czynnikiem wpływającym na ustawienia jest ilość pamięci dedykowanej karty graficznej. W przypadku użycia karty graficznej z większą ilością pamięci RAM, zalecane jest ustawienie większej wartości parametrów **PER_DEVICE_TRAIN_BATCH_SIZE** i **PER_DEVICE_EVAL_BATCH_SIZE**.

### Pobieranie i przechowywanie modeli podstawowych
Modele są pobierane na dysk lokalny przy pierwszej próbie utworzenia modelu bazowego. Jeśli w cache'u znajduje się już pobrany model, to zostanie on wykorzystany do utworzenia nowej instancji.