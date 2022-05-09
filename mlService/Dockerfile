FROM pytorch/pytorch:1.11.0-cuda11.3-cudnn8-runtime
#Install missing packages to alpine image
#RUN apk add gcc musl-dev libffi-dev
WORKDIR /app
COPY ./requirements.txt ./requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt
COPY ./ ./
CMD uvicorn main:app --host 0.0.0.0 --port 80