import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { config } from './config/environment.js';
import { connectDB } from './config/database.js';
import { logger } from './utils/logger.js';

// Connect to database
connectDB();

const server = app.listen(config.port, () => {
  logger.info(`Portfolio CMS Backend server running on port ${config.port} [${config.nodeEnv}]`);
  logger.info(`Client URL allowed: ${config.clientUrl}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});
