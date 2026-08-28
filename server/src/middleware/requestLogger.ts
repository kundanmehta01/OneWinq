import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import { logger } from '../config/logger.js';

declare global {
    namespace Express {
        interface Request {
            id: string;
            userId?: string;
        }
    }
}

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    const requestId = (req.headers['x-request-id'] as string) || randomUUID();
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
        }

        if (res.statusCode >= 500) {
            logger.error(logData, 'HTTP Request Error');
        } else if (res.statusCode >= 400) {
            logger.warn(logData, 'HTTP Request Warning');
        } else {
            logger.info(logData, 'HTTP Request Completed');
        }
    });

    next();
}