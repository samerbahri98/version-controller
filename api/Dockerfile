FROM node:17-alpine

WORKDIR '/var/www/app'

RUN npm install -g @nestjs/cli

COPY package*.json .
COPY yarn* .
RUN npm install

COPY . .

RUN nest build

EXPOSE 1337

CMD ["npm", "run","start:prod"]