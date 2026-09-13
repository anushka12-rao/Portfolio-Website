import express from 'express';
import {
  getPublicProjects,
  getProjectBySlug,
  getAllAdminProjects,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImage
} from '../controllers/projectController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeAdmin } from '../middleware/authorizeAdmin.js';
import { validate } from '../middleware/validate.js';
import { projectCreateSchema, projectUpdateSchema } from '../validators/projectValidator.js';
import { uploadMiddleware } from '../config/cloudinary.js';

const router = express.Router();

// Public routes
router.get('/projects', getPublicProjects);
router.get('/projects/:slug', getProjectBySlug);

// Admin routes
router.get('/admin/projects', authenticate, authorizeAdmin, getAllAdminProjects);
router.post(
  '/admin/projects',
  authenticate,
  authorizeAdmin,
  validate(projectCreateSchema),
  createProject
);
router.patch(
  '/admin/projects/:id',
  authenticate,
  authorizeAdmin,
  validate(projectUpdateSchema),
  updateProject
);
router.delete('/admin/projects/:id', authenticate, authorizeAdmin, deleteProject);
router.post(
  '/admin/projects/upload',
  authenticate,
  authorizeAdmin,
  uploadMiddleware.single('image'),
  uploadProjectImage
);

export default router;
