FROM python:3.9-alpine
#Install missing packages to alpine image
#RUN apk add gcc musl-dev libffi-dev
WORKDIR /app
COPY ./requirements.txt ./requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt
COPY ./ ./
CMD python -u main.py