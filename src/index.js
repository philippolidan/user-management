const { NODE_LOCAL_PORT } = require("./config/vars");
const express = require("express");
const cors = require("cors");
const error = require("./api/middlewares/error");
const routes = require('./api/routes');

const app = express();

const PORT = NODE_LOCAL_PORT;

var corsOptions = {
  origin: `http://localhost:${PORT}`
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

/* 
error handlers 
*/

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;