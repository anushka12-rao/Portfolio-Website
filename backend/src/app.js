import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import path from 'path';
import { fileURLToPath } from 'url';

import { config } from './config/environment.js';
import { getSessionCookieConfig } from './utils/cookies.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import technologyRoutes from './routes/technologyRoutes.js';
import achievementRoutes from './routes/achievementRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  })
);

// CORS configuration locked to frontend origin
const allowedOrigins = [
  config.clientUrl,
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS policy blocked access from origin ${origin}`));
    },
    credentials: true
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Static file serving for local image uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Session configuration
const sessionStore = MongoStore.create({
  mongoUrl: config.mongodbUri,
  collectionName: 'sessions',
  ttl: 60 * 60 * 24 * 7 // 7 days
});

// Avoid crashes if MongoStore loses connection temporarily
sessionStore.on('error', (err) => {
  console.warn('[SESSION STORE] Warning: MongoDB session store error:', err.message);
});

app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: getSessionCookieConfig()
  })
);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv
  });
});

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api', projectRoutes);
app.use('/api', technologyRoutes);
app.use('/api', achievementRoutes);
app.use('/api', messageRoutes);
app.use('/api', profileRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
