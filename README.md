## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the dependencies.

```bash
npm install
```

## Usage

```bash
#Running the App
npm start

#Migration
npm run-script migrate

#Seed test data
npm run-script seed

#Unit Testing
npm run-script test

access the api using [http://localhost:8080](http://localhost:8080)
```
## Postman
Postman [collection](https://api.postman.com/collections/10713624-5e49deb9-cd9c-48a0-9762-705a8fc219e7?access_key=PMAT-01GR1BBHCX5A4V637KR858D5HQ)

## Run in Docker
Requirements [docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/)

## Usage

```bash
#Building and running the app
docker-compose up --build -d

docker-compose -p user-management exec app npm run-script migrate
docker-compose -p user-management exec app npm run-script seed

access the api using [http://localhost:8080](http://localhost:8080)
```