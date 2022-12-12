# syntax=docker/dockerfile:1

FROM node:18

WORKDIR /code

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8081

# CMD [ "npm", "run", "start" ]
