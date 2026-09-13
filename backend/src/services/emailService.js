import { logger } from '../utils/logger.js';

export const sendContactNotification = async (messageData) => {
  // In production, configure SendGrid, Resend, or Nodemailer SMTP
  logger.info(`New contact message received from: ${messageData.name} <${messageData.email}>`);
};
