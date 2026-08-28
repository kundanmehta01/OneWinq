import mongoose from 'mongoose';
import { config } from './env.js';
import { logger } from './logger.js';

export const connectDatabase = async () => {
  try {
    mongoose.connection.on('connected', () => {
      logger.info('MongoDB connected successfully');
    });

    mongoose.connection.on('error', (err) => {
      logger.error({ err }, 'MongoDB connection error');
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    const conn = await mongoose.connect(config.MONGODB_URI, {
      autoIndex: config.NODE_ENV !== 'production',
    });

    return conn;
  } catch (error) {
    logger.fatal({ error }, 'Failed to connect to MongoDB');
    process.exit(1);
  }
};

export const disconnectDatabase = async () => {
  try {
    await mongoose.connection.close();
    logger.info('MongoDB connection closed');
  } catch (error) {
    logger.error({ error }, 'Error closing MongoDB connection');
  }
};

export const isDatabaseConnected = () => {
  return mongoose.connection.readyState === 1;
};
