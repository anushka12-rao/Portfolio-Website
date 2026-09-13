import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio-cms',
  sessionSecret: process.env.SESSION_SECRET || 'dev_super_secret_session_key_32_chars_long!',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@portfolio.local',
  adminPassword: process.env.ADMIN_PASSWORD || 'Admin@123456',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || ''
  }
};
