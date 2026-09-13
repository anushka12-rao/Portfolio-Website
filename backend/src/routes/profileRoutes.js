import express from 'express';
import {
  getPublicProfile,
  updateProfile,
  getDashboardStats
} from '../controllers/profileController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeAdmin } from '../middleware/authorizeAdmin.js';
import { validate } from '../middleware/validate.js';
import { profileUpdateSchema } from '../validators/profileValidator.js';

const router = express.Router();

// Public route
router.get('/profile', getPublicProfile);

// Admin routes
router.patch(
  '/admin/profile',
  authenticate,
  authorizeAdmin,
  validate(profileUpdateSchema),
  updateProfile
);
router.get('/admin/dashboard/stats', authenticate, authorizeAdmin, getDashboardStats);

export default router;
