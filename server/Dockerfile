FROM node:20.11.1-alpine3.18

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "run", "start:dev"]