import { config } from '../config/environment.js';

export const getSessionCookieConfig = () => ({
  httpOnly: true,
  secure: config.isProduction,
  sameSite: config.isProduction ? 'none' : 'lax',
  maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
});
