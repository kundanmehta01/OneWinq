import http from 'http';
import { app } from './app.js';
import { config } from './config/env.js';
import { logger } from './config/logger.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';

const startServer = async () => {
  await connectDatabase();

  const server = http.createServer(app);

  server.listen(config.PORT, () => {
    logger.info(`OneWinq API Server running on port ${config.PORT} [${config.NODE_ENV}]`);
  });

  const handleShutdown = async (signal) => {
    logger.info(`Received ${signal}. Starting graceful shutdown...`);

    server.close(async () => {
      logger.info('HTTP server closed');
      await disconnectDatabase();
      logger.info('Graceful shutdown completed. Exiting.');
      process.exit(0);
    });

    setTimeout(() => {
      logger.error('Graceful shutdown timed out. Forcing exit.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));

  process.on('unhandledRejection', (reason) => {
    logger.fatal({ reason }, 'Unhandled Promise Rejection detected');
  });

  process.on('uncaughtException', (error) => {
    logger.fatal({ error }, 'Uncaught Exception detected');
    handleShutdown('uncaughtException');
  });
};

startServer();
