FROM python:3.7

RUN apt-get update && apt-get -y install cron vim

RUN pip install -U pip && pip install pipenv && \
    pip install tweepy && pip install mysql-connector-python && pip install python-dotenv && pip install schedule

WORKDIR /app

COPY . .

# run crond as main process of container
CMD ["python", "-u", "src/twitterbot.py"]