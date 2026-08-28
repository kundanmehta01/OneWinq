import { randomUUID } from 'crypto';
import { logger } from '../config/logger.js';

export const requestLogger = (req, res, next) => {
  const start = Date.now();

  const requestId = req.headers['x-request-id'] || randomUUID();
  req.id = requestId;
  res.setHeader('X-Request-Id', requestId);

  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      requestId: req.id,
      method: req.method,
      url: req.originalUrl || req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userId: req.userId || undefined,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    };

    if (res.statusCode >= 500) {
      logger.error(logData, 'HTTP Request Error');
    } else if (res.statusCode >= 400) {
      logger.warn(logData, 'HTTP Request Warning');
    } else {
      logger.info(logData, 'HTTP Request Completed');
    }
  });

  next();
};
