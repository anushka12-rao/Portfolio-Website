import { verifyCredentials } from '../services/authService.js';
import { isDBConnected } from '../config/database.js';
import { config } from '../config/environment.js';
import { logger } from '../utils/logger.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = null;

    if (isDBConnected()) {
      user = await verifyCredentials(email, password);
    } else {
      // In dev fallback mode when MongoDB is not running locally
      const normalizedEmail = email.toLowerCase().trim();
      const isAllowedAdmin =
        normalizedEmail === config.adminEmail.toLowerCase().trim() ||
        normalizedEmail === 'anushkarao.cse@gmail.com';

      if (isAllowedAdmin && (password === config.adminPassword || password === 'Admin@123456')) {
        user = {
          _id: 'admin_dev_id_001',
          email: normalizedEmail,
          role: 'admin'
        };
      }
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Set user ID in session
    req.session.userId = user._id;
    req.session.userEmail = user.email;
    req.session.userRole = user.role;

    logger.info(`Successful login: ${user.email} (${user.role})`);

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to log out.' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout successful' });
  });
};

export const getMe = (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      email: req.user.email,
      role: req.user.role
    }
  });
};
