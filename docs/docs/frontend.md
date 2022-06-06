# Frontend

---

### Technologie użyte przy tworzeniu warstwy klienta aplikacji

Front End został stworzony za pomocą biblioteki React, dzięki której możliwe było tworzenie komponentów oraz widoków, z których 

składa się aplikacja oraz z bliblioteki Redux, która służyła do zarządzania stanem aplikacji. Ponadto w projekcie wykorzystywana 

jest biblioteka Redux Toolkit, która upraszcza logikę reduxa oraz ułatwia tworzenia globalnego stanu aplikacji.

### Widoki aplikacji oraz funkcjonalności w nich zawarte

Stworzona aplikacja w zależności od tego czy użytkownik posiada konto (jest adminem) czy też nie posiada konta, 

wyświetla różne widoki. Osoba posiadająca konto jest odpowiedzialna za zarządzanie projektami oraz ich zawartością.

**Strona główna:**

Stronę główną możemy podzielić na stronę gdy uzytkownik jest zalogowany oraz w momencie gdy nie jest.

* Użytkownik zalogowany:
>Podczas gdy osoba wchodząca do aplikacji nie jest zalogowana, wyświetlona zostaje informacja wstępna opisująca 
>do czego służy stworzona aplikacja. Z racji że strona ma charakter informacyjny to, jedynymi funkcjonalnościami są
>przejścia do strony autoryzaji za pomocą przycisków: 'Create account', 'Login' znajdujących się w nagłówku strony.
>
* Użytkownik nie zalogowany:
>Gdy użytkownik jest zalogowany strona główna staje się panelem admina. W panelu zostaje wyświetlona lista stworzonych 
>przez admina projektów. Ponadto w tym właśnie widoku mamy możliwość stworzenia nowego projektu.
	
