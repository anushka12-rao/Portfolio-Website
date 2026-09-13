import mongoose from 'mongoose';
import { config } from './environment.js';
import { logger } from '../utils/logger.js';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(config.mongodbUri, {
      serverSelectionTimeoutMS: 15000,
    });

    isConnected = conn.connections[0].readyState === 1;
    logger.info(`MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    logger.warn(`MongoDB not detected on ${config.mongodbUri} (${error.message}).`);
    logger.info(`Active in Dev Mode with in-memory state. To connect to Cloud MongoDB, add your Atlas URI to backend/.env.`);
  }
};

export const disconnectDB = async () => {
  if (!isConnected) return;
  await mongoose.disconnect();
  isConnected = false;
  logger.info('MongoDB disconnected cleanly');
};

mongoose.connection.on('disconnected', () => {
  isConnected = false;
});

export const isDBConnected = () => {
  return mongoose.connection.readyState === 1;
};
