import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../lib/errors/appError.js';
import { logger } from '../config/logger.js';
import { config } from '../config/env.js';

export const errorHandler: ErrorRequestHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    // If it's our custom operational AppError
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            ...(err.errors && { errors: err.errors }),
        });
    }

    // Handle Mongoose / MongoDB Duplicate Key Error (E11000)
    if ((err as any).code === 11000) {
        const field = Object.keys((err as any).keyValue || {})[0] || 'field';
        return res.status(409).json({
            success: false,
            message: `${field} already exists`,
            errors: [{ field, message: `${field} already exists` }],
        });
    }

    // Handle Mongoose CastError (e.g. invalid ObjectId format)
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: `Invalid identifier format for ${(err as any).path}`,
        });
    }

    // Unexpected / Unhandled 500 Errors
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
