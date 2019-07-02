# Meli X-MEN

## Requirements
  * Docker

## Directory Layout

Before you start, take a moment to see how the project structure looks like:

```
.
├── /app/                       # The source code of the application
│   ├── /models/                # Models of the application
│   ├── /controllers/           # Controller of the routes
│   ├── /routes/                # Routes of the application
│   ├── /services/              # Libs, services, and more
│   ├── app.js                  # Configuration of the server
│   ├── index.js                # Script with start server
├── /node_modules/              # 3rd-party libraries and utilities
├── /__tests__/                 # The source of test
├── package.json                # The list of 3rd party libraries and utilities
├── Dockerfile                  # Dockerfile with application
└── docker-compose.yml          # Docker-compose for local development
```

## Getting started

#### Start service with docker
```
docker-compose up
```
If you want to run background docker add the `-d` parameter.


#### Start service without docker
```shell
## Start for development enviroment
$ npm run start:dev

## Start for production enviroment
$ npm run start

## Run test
$ npm run test
```

