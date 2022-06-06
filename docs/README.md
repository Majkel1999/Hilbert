# HilBERT - Aplikacja do klasyfikacji tekstów

HilBERT to aplikacja webowa służąca do trenowania modeli typu BERT przy użyciu taktyki Human-In-the-Loop.

[![CodeQL](https://github.com/Majkel1999/Hilbert/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Majkel1999/Hilbert)

---

## Przedmiot i cel pracy
  Celem projektu jest stworzenie systemu do automatycznej klasyfikacji tekstu. System ma za zadanie klasyfikować teksty i przydzielać im tagi na podstawie wcześniej wyuczonego modelu.

## Analiza potrzeb użytkownika
  Użytkownikiem aplikacji jest osoba, która posiada zbiór tekstów i potrzebuje narzędzia, które będzie je klasyfikowało używając do tego etykiet. Teksty na początku są nieotagowane, a ręczna klasyfikacja jest kosztowna, ponieważ trzeba zatrudnić osobę/by do wykonania tego zadania. Dzięki aplikacji, użytkownik może na początku samodzielnie lub za pomocą kilku osób etykietować teksty, aby w późniejszej fazie model(BERT) samodzielnie mógł wykonywać te czynności.

Ze zbioru dokumentów tekstowych wybierany jest tekst, któremu użytkownik/osoba etykietyzująca przydzieli określoną etykietę. Po otagowaniu pewnej ilości tekstów, możemy przejść do uczenia modelu. Po wstępnym nauczeniu modelu, osoba odpowiedzialna za etykietyzację będzie otrzymywać podpowiedzi, która etykieta jest odpowiednia dla danego tekstu. Dzięki temu, kolejne etapy etykietyzacji wykonywane przez użytkownika, będą przebiegać sprawniej, a model będzie jeszcze sprawniej etykietował teksty.
W konsekwencji otrzymujemy system, który za nas klasyfikuje teksty na podstawie wyuczonych modelów.

Możliwości jakie powinna dawać użytkownikom aplikacja:
- tworzenie konta administratora, który zarządza pokojami
- tworzenie osobnych pokoi, w których będą odbywały się odrębne klasyfikacje tekstów i trenowanie modeli
- możliwość wprowadzenia plików tekstowych do systemu posiadających różne rozszerzenia
- klasyfikacja tekstów przez użytkownika/osobę etykietyzującą 
- możliwość zapisu modelu do pliku, wraz z wagami oraz punktami kontrolnymi
- nauczenie modelu rozpoznawania tekstów i przydzielania im etykiet
- podgląd na statystyki związane z poprawnością działania modelu

## Progress

- Architektura:
  - [x]  Swtorzenie modelu architektury
  - [x]  Stworzenie pojedynczych obrazów kontenerów
  - [x]  Stworzenie pliku docker-compose.yaml
  - [x]  Kolejkowanie - RabbitMQ
  - [x]  Load Balancing
  - [x]  Baza Danych - MongoDB
  - [x]  Monitoring - Grafana + Prometheus
- Frontend:
  - [x] Strona Główna
  - [x] Rejestracja
  - [x] Logowanie
  - [x] Tworzenie projektów
  - [x] Uploadowanie plików
  - [x] Tagowanie
  - [x] Wyświetlanie predykcji
  - [ ] Responsywność
  - [x] Wystylizowanie
- Backend:
  - [x] Uwierzytelnianie i Autoryzacja 
  - [x] Tworzenie projektów
  - [x] Uploadowanie plików
  - [x] Generowanie zaproszeń 
  - [x] Tagowanie
  - [x] Kolejkowanie uczenia modeli
  - [x] Anonimowe zapisywanie tagujących
  - [ ] Proxy do pobierania plików
- Model Service:
  - [x] Pobieranie modeli z internetu
  - [x] Uczenie modelu na danych użytkowników
  - [x] Zwracanie predykcji
  - [ ] Obsługa projektów multi-label
  - [ ] Obsługa różnych modeli początkowych 