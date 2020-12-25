FROM node:15-alpine

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

EXPOSE 3030

CMD [ "yarn", "start" ]