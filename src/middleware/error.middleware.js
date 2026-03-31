const ApiError = require('../utils/ApiError');
const env = require('../config/env');
const logger = require('../utils/logger');

const notFoundHandler = (req, _res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

const errorHandler = (err, _req, res, _next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    if (error.name === 'ValidationError') {
      error = new ApiError(400, 'Database validation failed', Object.values(error.errors).map((item) => item.message));
    } else if (error.message === 'Not allowed by CORS') {
      error = new ApiError(403, error.message);
    } else if (error.code === 11000) {
      error = new ApiError(409, 'Duplicate field value entered', error.keyValue);
    } else if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      error = new ApiError(401, 'Invalid or expired token');
    } else {
      error = new ApiError(500, 'Internal server error');
    }
  }

  if (error.statusCode >= 500) {
    logger.error(error.message, {
      stack: error.stack,
      details: error.details,
    });
  }

  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
    ...(error.details ? { details: error.details } : {}),
    ...(env.nodeEnv !== 'production' ? { stack: error.stack } : {}),
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
