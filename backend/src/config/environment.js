import dotenv from 'dotenv';
dotenv.config();

const rawClientUrl = (process.env.CLIENT_URL || 'http://localhost:5173').trim();
const clientUrl = rawClientUrl.replace(/\/+$/, '');
const mongodbUri = (process.env.MONGODB_URI || process.env.MONGO_DB_URI || '').trim();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  clientUrl,
  mongodbUri,
  sessionSecret: process.env.SESSION_SECRET || 'dev_super_secret_session_key_32_chars_long!',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@portfolio.local',
  adminPassword: process.env.ADMIN_PASSWORD || 'Admin@123456',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || ''
  }
};
