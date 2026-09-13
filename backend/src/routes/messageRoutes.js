import express from 'express';
import {
  createMessage,
  getAdminMessages,
  markMessageRead,
  deleteMessage
} from '../controllers/messageController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeAdmin } from '../middleware/authorizeAdmin.js';
import { validate } from '../middleware/validate.js';
import { messageLimiter } from '../middleware/rateLimiter.js';
import { messageCreateSchema } from '../validators/messageValidator.js';

const router = express.Router();

// Public route with rate limiting
router.post('/messages', messageLimiter, validate(messageCreateSchema), createMessage);

// Admin routes
router.get('/admin/messages', authenticate, authorizeAdmin, getAdminMessages);
router.patch('/admin/messages/:id/read', authenticate, authorizeAdmin, markMessageRead);
router.delete('/admin/messages/:id', authenticate, authorizeAdmin, deleteMessage);

export default router;
