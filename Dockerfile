FROM python

WORKDIR /src

RUN apt-get update && apt-get -y install cron vim

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm

RUN pip install -U pip && pip install pipenv && \
    pip install tweepy && pip install mysql-connector-python && pip install python-dotenv && pip install schedule

COPY package*.json ./

COPY crontab /etc/cron.d/crontab

RUN chmod 0644 /etc/cron.d/crontab

RUN /usr/bin/crontab /etc/cron.d/crontab

COPY . .

RUN npm install

EXPOSE 8080:80

CMD npm run start; cron -f