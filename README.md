
# Hilbert - application for text classification


Hilbert is a web application, designated for text classification. It implements a BERT model, trained via Human-in-the-Loop tactics.

[![Build Status](http://majkuss.mooo.com:8080/buildStatus/icon?job=Hilbert)](https://github.com/Majkel1999/Hilbert)

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

In order to change configuration, edit **docker-compose.yml**. Default port allocation is as follows:

    "80:80" - web service

where the first port is on the physical pc, and the second is inside container. **Only change the first port, unless you know what you are doing.** For more information, consult [official docker-compose documentation](https://docs.docker.com/compose/).

For more information, consult official [Traefik routing documentation](https://doc.traefik.io/traefik/routing/overview/).

---