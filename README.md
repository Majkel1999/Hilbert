
# Hilbert - application for text classification


Hilbert is a web application, designated for text classification. It implements a BERT model, trained via Human-in-the-Loop tactics.

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

    "8000:3000" - backend service
    "8888:8081" - mongo express web interface
    "8080:8080" - traefik dashboard

where the first port is on the physical pc, and the second is inside container. **Only change the first port, unless you know what you are doing.** For more information, consult [official docker-compose documentation](https://docs.docker.com/compose/).

The default configuration assumes that those services can only be accessed from `localhost`. In order to be able to acces them from a different host, edit all entries:

> traefik.http.routers.*.rule=Host(\`localhost\`)

and change `localhost` for own domain, as such:

> traefik.http.routers.*.rule=Host(\`your.domain.org\`)

For more information, consult official [Traefik routing documentation](https://doc.traefik.io/traefik/routing/overview/).

---