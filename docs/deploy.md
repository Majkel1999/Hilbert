# Uruchomienie
---
### Wymagania
Jedynym wymaganiem do uruchomienia aplikacji jest posiadanie komputera z zainstalowanym [Dockerem](https://docs.docker.com/engine/install/), [Docker-Compose](https://docs.docker.com/compose/install/) 1.28.0 lub nowszy, [nvidia-container-toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html) w przypadku systemu Linux lub [CUDA on WSL](https://docs.nvidia.com/cuda/wsl-user-guide/index.html) w przypadku Windowsa. W celu uzyskania pełnej funkcjonalności, komputer musi być wyposażony w dedykowaną kartę graficzną posiadającą conajmniej 2GB pamięci RAM. 

| Wymaganie          | Minimum            |
| ------------------ | ------------------ |
| OS                 | Linux, Windows     |
| Przestrzeń dyskowa | 20GB               |
| RAM                | 2G                 |
| GPU                | :heavy_check_mark: |
| GPU RAM            | 2G                 |

### Jak uruchomić?
Stworzenie własnej instancji aplikacji jest bardzo proste. Jeśli komputer spełnia wymagania opisane powyżej, wystarczy wykonać polecenia:

```bash
git clone https://github.com/Majkel1999/Hilbert/
cd Hilbert
docker compose up -d
```

Aby dodatkowo uzyskać monitorowanie poszczególnych serwisów poprzez użycie Prometheus'a i Grafany, można uruchomić aplikację z flagą '--profile production' w następujący sposób
```bash
docker compose --profile production up -d
```

W celu zmiany konfiguracji, wymagana jest edycja pliku **.env** w folderze **/Hilbert**

```bash
COMPOSE_PROJECT_NAME=hilbert    - nazwa projektu, która zostanie użyta przy tworzeniu kontenerów
EXTERNAL_PORT=8000              - port lokalny, na którym zostaną udostępnione wszystkie serwisy
DB_USER=root                    - domyślna nazwa użytkownika w bazie danych  
DB_PASS=root                    - domyślne hasło w bazie danych 
RABBITMQ_USER=guest             - domyślna nazwa użytkownika w RabbitMQ
RABBITMQ_PASS=guest             - domyślne hasło w RabbitMQ
```

W celu uzyskania większej ilości informacji, można zobaczyć [oficjalną dokumentację docker-compose.](https://docs.docker.com/compose/)

Domyślna konfiguracja udostępnia następujące serwisy:
- / - frontend
- /api/v1/ - backend
- /api/v1/docs/ - dokumnetacja Swagger
- /rabbitmq/ - RabbitMQ Management
- /prometheus/ - Prometheus *[opcjonalnie]*
- /grafana/ - Grafana *[opcjonalnie]*

W celu zmiany endpointów warto przejrzeć [dokumentację routingu Traefik.](https://doc.traefik.io/traefik/routing/overview/)

---
