FROM node:16

WORKDIR /src

RUN apt-get update && apt-get upgrade -y

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 8080:80

CMD [ "npm", "run", "start" ]