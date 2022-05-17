
# Hilbert - application for text classification


Hilbert is a web application, designated for text classification. It implements a BERT model, trained via Human-in-the-Loop tactics.

[![CodeQL](https://github.com/Majkel1999/Hilbert/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Majkel1999/Hilbert)
---
## Deploying

---

Creating your own instance of the application is as easy as this:

```
git clone https://github.com/Majkel1999/Hilbert/
cd Hilbert
docker-compose up 
```

In order to change configuration, edit **.env** file in root directory. By default it hosts all services at **localhost:8000**. 

For more information, consult [official docker-compose documentation](https://docs.docker.com/compose/).

Current endpoints are:
- / - frontend
- /api/v1 - Api service
- /api/v1/docs - Swagger documentation
- /prometheus - Prometheus dashboard
- /rabbitmq - RabbitMQ Management plugin
- /grafana - Grafana with 2 dashboards for monitoring

For more information, consult official [Traefik routing documentation](https://doc.traefik.io/traefik/routing/overview/).

---
