FROM node:16.18.1 as build-stage

WORKDIR /app
COPY package*.json ./

RUN npm i
COPY . .

CMD ["npm", "start"]
