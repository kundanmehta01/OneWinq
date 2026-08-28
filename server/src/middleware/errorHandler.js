import { AppError } from '../lib/errors/appError.js';
import { logger } from '../config/logger.js';
import { config } from '../config/env.js';

export const errorHandler = (err, req, res, _next) => {
  // If operational AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.errors && { errors: err.errors }),
    });
  }

  // MongoDB Unique Constraint (E11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
      errors: [{ field, message: `${field} already exists` }],
    });
  }

  // Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid identifier format for ${err.path}`,
    });
  }

  // Unhandled 500
  logger.error(
    {
      requestId: req.id,
      err: {
        message: err.message,
        stack: err.stack,
        name: err.name,
      },
      url: req.originalUrl,
      method: req.method,
    },
    'Unhandled Server Exception'
  );

  return res.status(500).json({
    success: false,
    message: config.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    ...(config.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};
