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

export const requestLogger =