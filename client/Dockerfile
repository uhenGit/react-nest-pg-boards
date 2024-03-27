FROM node:20.11.1-alpine3.18

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY ./ ./

EXPOSE 5173

CMD ["npm", "run", "dev"]