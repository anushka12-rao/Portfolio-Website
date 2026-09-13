import express from 'express';
import {
  getPublicTechnologies,
  getAllAdminTechnologies,
  createTechnology,
  updateTechnology,
  deleteTechnology
} from '../controllers/technologyController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeAdmin } from '../middleware/authorizeAdmin.js';
import { validate } from '../middleware/validate.js';
import { technologyCreateSchema, technologyUpdateSchema } from '../validators/technologyValidator.js';

const router = express.Router();

// Public routes
router.get('/technologies', getPublicTechnologies);

// Admin routes
router.get('/admin/technologies', authenticate, authorizeAdmin, getAllAdminTechnologies);
router.post(
  '/admin/technologies',
  authenticate,
  authorizeAdmin,
  validate(technologyCreateSchema),
  createTechnology
);
router.patch(
  '/admin/technologies/:id',
  authenticate,
  authorizeAdmin,
  validate(technologyUpdateSchema),
  updateTechnology
);
router.delete('/admin/technologies/:id', authenticate, authorizeAdmin, deleteTechnology);

export default router;
