import { User } from '../models/User.js';

export const authenticate = async (req, res, next) => {
  try {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: 'Authentication required. No active session found.' });
    }

    const user = await User.findById(req.session.userId).select('-passwordHash');
    if (!user) {
      req.session.destroy();
      return res.status(401).json({ error: 'Session user no longer exists.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Failed to authenticate user.' });
  }
};
