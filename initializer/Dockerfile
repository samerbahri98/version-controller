FROM node:17-alpine

WORKDIR '/var/www/app'

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm","run","init" ]