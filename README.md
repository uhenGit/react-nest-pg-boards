# Dockerise trello-like app

### Usage (you should have a docker and a docker compose installed)
- clone the repo
- cd to the client direcory, and run
```
npm install
```
- cd to the root, and then to the server directory, run
```
npm install
```
- cd to the root, and run
```
docker compose up
```

### Technologies
- ReactJS + Typescript for the front end (including Vite and MobX)
- NestJS + Typescript for the backend
- PostgreSQL + PrismaORM as a database