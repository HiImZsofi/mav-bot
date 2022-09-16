FROM python

WORKDIR /app

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm

RUN pip install -U pip && pip install pipenv && \
    pip install tweepy && pip install mysql-connector-python

COPY package*.json ./

COPY . /app/

RUN npm install

EXPOSE 8080:80

RUN npm run setup

CMD [ "npm", "run", "start" ]