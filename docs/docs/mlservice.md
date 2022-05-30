# Model Learning Service

---

Serwis odpowiedzialny za naukę sieci neuronowych oraz klasyfikację tekstów został stworzony w Pythonie 3.9, przy użyciu biblioteki PyTorch. Jednocześnie, działa on jako REST API, odpowiedzialne za wysyłanie sklasyfikowanych tekstów. 

## Tworzenie instancji modeli

Pierwszy request o trenowanie lub klasyfikację tekstu dla każdego projektu powoduje stworzenie instancji modeli w pamięci. Proces tworzenia modelu z pliku trwa około 10 sekund, więc z tego powodu pierwsze żadanie klasyfikacji może otrzymać status *timeout*. Stworzony model zostaje dodany do słownika, tak, aby można było go wykorzystywać w kolejnych wywołaniach. Z powodu dużego zapotrzebowania na pamięć RAM pojedynczego modelu, posiada on 5 minutowy czas życia, od ostatniego wywołania. Dzięki temu możliwe jest dynamiczne zwalnianie pamięci, a także szybkie wywoływanie w następnych requestach. 

> Usunięcie modelu z pamięci podręcznej następuje po 5 minutach od ostatniego żadania klasyfikacji tekstu lub po jego trenowaniu.

## Klasyfikacja tekstu

Po otrzymaniu żądania o klasyfikację tekstu, następuje utworzenie modelu zgodnie z opisem w [poprzednim paragrafie](#tworzenie-instancji-modeli). Następnie, tekst jest tokenizowany i zwracana jest lista klas wraz z procentową wartością dopasowania. 

## Trenowanie modelu

Kolejkowanie trenowania modeli jest wykonywane w 2 krokach: najpierw kolejkowane jest w RabbitMQ a następnie w serwisie, który odbierze daną wiadomość. Trenowanie odbywa się na kartcie graficznej, a w przypadku jej braku na procesorze. Po wywołaniu trenowania, pobierane są wszystkie teksty, które posiadają conajmniej jeden tag w bazie danych, a następnie jest z nich tworzony *TextDataset*. Trening wykonywany jest zgodnie z parametrami opisanymi w [BERT](bert.md/#parametry) 
> Zalecane jest uruchomienia aplikacji z dostępem do karty graficznej.
