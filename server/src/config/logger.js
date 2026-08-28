import pino from 'pino';
import { config } from './env.js';

export const logger = pino({
    level: config.LOG_LEVEL,
    redact: {
        paths: [
            'req.headers.authorization',
            'req.headers.cookie',
            'body.password',
            'body.passwordHash',
            'body.refreshToken',
            'body.token',
            'password',
            'refreshToken',
        ],
        remove: true,
    },
    transport:
        config.NODE_ENV === 'development'
            ? {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    translateTime: 'SYS:standard',
                    ignore: 'pid,hostname',
                },
            }
            : undefined,
});
