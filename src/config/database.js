const { MYSQLDB_USER, MYSQLDB_ROOT_PASSWORD, MYSQLDB_DATABASE, MYSQLDB_HOST, MYSQLDB_LOCAL_PORT } = require("./vars");

module.exports = {
    "username": MYSQLDB_USER,
    "password": MYSQLDB_ROOT_PASSWORD,
    "database": MYSQLDB_DATABASE,
    "host": MYSQLDB_HOST,
    "port": MYSQLDB_LOCAL_PORT,
    "dialect": "mysql",
    "logging": false
};
