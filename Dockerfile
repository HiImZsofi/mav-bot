FROM python

WORKDIR /src

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm

RUN pip install -U pip && pip install pipenv && \
    pip install tweepy && pip install mysql-connector-python && pip install python-dotenv && pip install schedule

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 8080:80

CMD [ "npm", "run", "start" ]