FROM node:20.11.1-alpine3.18

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY ./ ./

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start"]