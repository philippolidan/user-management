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


## Run in Docker
Requirements [docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/)

## Usage

```bash
#Building and running the app
docker-compose up --build -d

access the api using [http://localhost:8080](http://localhost:8080)
```