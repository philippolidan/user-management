// import .env variables
require("dotenv").config({ path: "./.env" });
module.exports = {
    APP_SECRET: process.env.APP_SECRET,
    MYSQLDB_HOST: process.env.MYSQLDB_HOST,
    MYSQLDB_USER: process.env.MYSQLDB_USER,
    MYSQLDB_ROOT_PASSWORD: process.env.MYSQLDB_ROOT_PASSWORD,
    MYSQLDB_DATABASE: process.env.MYSQLDB_DATABASE,
    MYSQLDB_LOCAL_PORT: process.env.MYSQLDB_LOCAL_PORT,
    MYSQLDB_DOCKER_PORT: process.env.MYSQLDB_DOCKER_PORT,
    NODE_LOCAL_PORT: process.env.NODE_LOCAL_PORT,
    NODE_DOCKER_PORT: process.env.NODE_DOCKER_PORT
};
