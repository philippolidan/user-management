const httpStatus = require("http-status");
const expressValidation = require("express-validation");
const APIError = require("../errors/api.error");
const { NODE_ENV } = require("../../config/vars");

/*
// error handler. send stacktrace only during development
// @public
*/
const handler = (err, req, res, next) => {
  const response = {
    status: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };

  if (NODE_ENV !== "development") {
    delete response.stack;
  }
  res.status(err.status);
  res.json(response);
};
exports.handler = handler;

/*
// if error is not an instancdOf APIError, convert it.
// @public
*/
exports.converter = (err, req, res, next) => {
  let convertedError = err;
  if (err instanceof expressValidation.ValidationError) {
    const keys = convertedError.details.body.map(item => item.context.key)
    const messages = convertedError.details.body.map(item => item.message)
    const errorArray = keys.map((key, index) => {
      const obj = {}
      obj[key] = messages[index]

      return obj
    })
    convertedError = new APIError({
      message: "Validation Error",
      errors: errorArray,
      status: 422,
      stack: err.stack,
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
    });
  }

  return handler(convertedError, req, res);
};

/*
// catch 404 and forward to error handler
// @public
*/
exports.notFound = (error, req, res, next) => {
  const err = new APIError({
    message: "Not found",
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res);
};
