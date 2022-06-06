# Backend
---
Back End został stworzony przy użyciu frameworka [FastAPI.](https://fastapi.tiangolo.com/)

Dokumentacja endpointów jest dostępna pod adresem **/api/v1/docs** po uruchomieniu aplikacji.

Aplikacja posiada jeden endpoint będący WebSocketem, na którym wysyłane są zdarzenia związane z wybranym projektem.

> **/project/{project_id}/ws** - gdzie {project_id} to ID projektu, o którym informacje mają być wysłane.
> Dane są wysyłane w formacie:
> 
> { 
> "event":"EventAction",
>  "projectId":"{projectId}"
>  }
> 
> Możliwe typy *EventAction* to:
> * FileAdded
> * FileDeleted
> * ModelTraining
> * ProjectDeleted

Komunikacja odbywa się na 2 sposoby: poprzez REST API oraz poprzez RabbitMQ.

###  Uwierzytelnianie i autoryzacja 

Uwierzytelnianie i autoryzacja użytkowników odbywa się przy pomocy schematu OAuth 2.0 z użyciem JWT. W tym celu została wykorzystana biblioteka **fastapi_jwt_auth**.
> Dane o sesjach **nie** są przechowywane w bazie danych!

Użytkownicy są uwierzytelniani na podstawie loginu i hasła. Możliwa jest implementacja SSO z wykorzystaniem zewnętrznych dostawców. 

### Przechowywanie danych o tagujących

Tagowanie tekstów nie wymaga zakładania konta. Po otrzymaniu linku z zaproszeniem, użytkownikowi zostaje wyświetlony tekst oraz lista możliwych tagów do wyboru. Jednocześnie, otrzymuje on unikalny identyfikator tagującego. Dane o powiązaniach tagujących wraz z otagowanymi tekstami znajdują się w bazie danych w tabeli **Tagger**.

Dane te nie są dostępne w żaden sposób w aplikacji. Jedyną możliwością ich otrzymania jest ręczne zalogowanie się do bazy danych i ich eksport lub odczyt.

### Architektura aplikacji
![App Architecture](../images/architecture.svg)
### Schemat bazy danych
Baza danych użyta w projekcie to [MongoDB](https://www.mongodb.com/)

![Database Schema](../images/db.svg ':size=80%')

### Zależności

Zależności aplikacji zostały opisane w pliku /backend/requirements.txt. Przedstawiają się one następująco:

```
fastapi==0.75.2
jose==1.0.0
passlib==1.7.4
pydantic==1.9.0
pydantic[email]==1.9.0
python_jose==3.3.0
uvicorn==0.15.0
python-multipart==0.0.5
pymongo==3.12.3
beanie==1.10.0
pdfminer.six==20211012
aio-pika==7.1.2
fastapi_jwt_auth==0.5.0
websockets==10.2
requests==2.25.1
```
W przypadku uruchomienia jako kontenery, są one instalowane automatycznie. W przypadku uruchomienia bezpośredniego na komputerze, instalacja jest możliwa za pomocą komendy
```
pip install -r requirements.txt
```
---

Diagrams created with [DrawIO](https://www.diagrams.net/)