# Frontend

---

### Technologie użyte przy tworzeniu warstwy klienta aplikacji

Front End został stworzony za pomocą biblioteki React, dzięki której możliwe było tworzenie komponentów oraz widoków, z których 

składa się aplikacja oraz z bliblioteki Redux, która służyła do zarządzania stanem aplikacji. Ponadto w projekcie wykorzystywana 

jest biblioteka Redux Toolkit, która upraszcza logikę reduxa oraz ułatwia tworzenia globalnego stanu aplikacji.

### Widoki aplikacji oraz funkcjonalności w nich zawarte

Stworzona aplikacja w zależności od tego czy użytkownik posiada konto (jest adminem) czy też nie posiada konta, 

wyświetla różne widoki. Osoba posiadająca konto jest odpowiedzialna za zarządzanie projektami oraz ich zawartością.

**Strona główna**

Stronę główną możemy podzielić na stronę gdy uzytkownik jest zalogowany oraz w momencie gdy nie jest.

* Użytkownik zalogowany:
>Podczas gdy osoba wchodząca do aplikacji nie jest zalogowana, wyświetlona zostaje informacja wstępna opisująca 
>do czego służy stworzona aplikacja. Z racji że strona ma charakter informacyjny to, jedynymi funkcjonalnościami są
>przejścia do strony autoryzaji za pomocą przycisków: 'Create account', 'Login' znajdujących się w nagłówku strony.
>
* Użytkownik nie zalogowany:
>Gdy użytkownik jest zalogowany strona główna staje się panelem admina. W panelu zostaje wyświetlona lista stworzonych 
>przez admina projektów. Ponadto w tym właśnie widoku mamy możliwość stworzenia nowego projektu.
	
**Strona otwartego projektu**
* Użytkownik zalogowany:
>Gdy admin wejdzie w wybrany przez niego projekt, zostaje wyświetlony widok na którym użytkownik ma możliwość wgrywania, 
>przeglądania wgranych oraz usuwania plików tekstowych. Strona projektu poza nazwą projektu, przedstawia również wybrane 
>tagi wczytane podczas tworzenia danego projektu. Omawiana strona poza wspomnianymi funkcjonalnościami udostępnia właścicielowi 
>konta: Wyświetlenie metryk modelu, pobranie modelu, wytrenowanie modelu, usunięcie tagów projektu,pobranie wgranych 
>plików oraz kopiowanie linku za pomocą którego dowolna osoba bez konta może anotować wgrany tekst. 

* Użytkownik nie zalogowany:
>Widok otwartego projektu bez otwartego konta jest dostępny jedynie dla osób posiadających odpowiedni link, który można 
>otrzymać od właściciela stworzonego projektu. Gdy osoba nie posiadająca konta dostanie się omawianej strony, ma ona możliwość 
>zobaczenia nazwy plików, które są wgrane w projekcie oraz który obecnie jest jej wyświetlany. Osoba ta, widząc zawartość danego 
>pliku ma możliwość wybrania jednego lub kilku tagów - w zależności od ustawień projektu, tym samym go tagując za pomocą przycisku 
>znajdującego się na stronie. Po otagowaniu tekstu, zostają wyświetlone statystyki przedstawiające poprawność wybranych tagów w procentach. 
>Gdy okno ze statystykami zostanie zamknięte, załadowana zostaje zawartość kolejnego pliku, który nie został jeszcze otagowany. 
