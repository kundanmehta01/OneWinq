import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config } from './config/env.js';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFound.js';
import { isDatabaseConnected } from './config/database.js';
import { apiRoutes } from './routes/index.js';

const createApp = () => {
  const app = express();

  app.use(helmet());

  app.use(
    cors({
      origin: config.CORS_ORIGIN,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id'],
    })
  );

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  app.use(requestLogger);

  // Health & Readiness Checks
  app.get('/health', (_req, res) => {
    res.status(200).json({
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

  app.get('/ready', (_req, res) => {
    const dbStatus = isDatabaseConnected();
    if (!dbStatus) {
      return res.status(503).json({
        status: 'unready',
        database: 'disconnected',
      });
    }
    return res.status(200).json({
      status: 'ready',
      database: 'connected',
    });
  });

  app.use('/api/v1', apiRoutes);

  // 404 & Global Error Handler
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

export const app = createApp();
