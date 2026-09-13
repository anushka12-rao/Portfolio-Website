import { verifyCredentials } from '../services/authService.js';
import { logger } from '../utils/logger.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await verifyCredentials(email, password);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Set user ID in session
    req.session.userId = user._id;
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
