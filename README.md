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
