FROM python:3.8
ENV PYTHONUNBUFFERED 1

# Allows docker to cache installed dependencies between builds
RUN pip install -U pip
# RUN apk add gcc musl-dev python3-dev libffi-dev openssl-dev cargo

RUN apt-get update && apt-get install -y build-essential libssl-dev libffi-dev python3-dev cargo

RUN pip install -U pip

COPY ./requirements.txt requirements.txt

RUN pip install -r requirements.txt

# Adds our application code to the image
COPY . code
WORKDIR code

EXPOSE 8000

# Run the production server
CMD newrelic-admin run-program gunicorn --bind 0.0.0.0:$PORT --access-logfile - fspictureframe.wsgi:application
