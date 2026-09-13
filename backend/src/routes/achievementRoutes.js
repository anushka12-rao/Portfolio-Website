import express from 'express';
import {
  getPublicAchievements,
  getAllAdminAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  uploadAchievementImage
} from '../controllers/achievementController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeAdmin } from '../middleware/authorizeAdmin.js';
import { validate } from '../middleware/validate.js';
import { achievementCreateSchema, achievementUpdateSchema } from '../validators/achievementValidator.js';
import { uploadMiddleware } from '../config/cloudinary.js';

const router = express.Router();

// Public routes
router.get('/achievements', getPublicAchievements);

// Admin routes
router.get('/admin/achievements', authenticate, authorizeAdmin, getAllAdminAchievements);
router.post(
  '/admin/achievements',
  authenticate,
  authorizeAdmin,
  validate(achievementCreateSchema),
  createAchievement
);
router.patch(
  '/admin/achievements/:id',
  authenticate,
  authorizeAdmin,
  validate(achievementUpdateSchema),
  updateAchievement
);
router.delete('/admin/achievements/:id', authenticate, authorizeAdmin, deleteAchievement);
router.post(
  '/admin/achievements/upload',
  authenticate,
  authorizeAdmin,
  uploadMiddleware.single('image'),
  uploadAchievementImage
);

export default router;
