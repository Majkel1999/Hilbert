FROM python:3.9-alpine
#Install missing packages to alpine image
RUN apk add gcc musl-dev libffi-dev
ENV DB_CONN_STRING mongodb://root:root@mongodb:27017
WORKDIR /app
COPY ./requirements.txt ./requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt
COPY ./ ./
EXPOSE 8000
CMD uvicorn run:app --host 0.0.0.0 --port 8000