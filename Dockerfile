FROM python

WORKDIR /src

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm

RUN pip install -U pip && pip install pipenv && \
    pip install tweepy && pip install mysql-connector-python && pip install python-dotenv

RUN apt-get update && apt-get install -y cron && cron

COPY package*.json ./

ADD tasks.sh /root/tasks.sh

COPY . .

RUN npm install

RUN chmod 0644 /root/tasks.sh

EXPOSE 8080:80

RUN crontab -l | { cat; echo "* * * * * bash /root/tasks.sh"; } | crontab -

RUN cron

CMD [ "npm", "run", "start" ]