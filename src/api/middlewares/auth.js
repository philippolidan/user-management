const jwt = require('jsonwebtoken');
const APIError = require('../errors/api.error');
const { APP_SECRET } = require('../../config/vars');
const {UNAUTHORIZED} = require('http-status');
/**
 * Function for JWT auth
 * @param {*} req the native express request object
 * @param {*} res the native express response object
 * @param {*} next the native express next object
 * Route group for public facing
 */

exports.authBearer = async (req, res, next) => {
  const apiError = new APIError({
    message: 'Unauthorized',
    status: UNAUTHORIZED,
    stack: undefined
  })
  if (req.headers.authorization === undefined) {
    return next(apiError)
  }
  const token = req.headers.authorization.split(' ')[1]
  jwt.verify(token, APP_SECRET, (err, data) => {
    if (data === undefined || err) {
      next(apiError)
    }
    req.user = data
  })
  next()
}