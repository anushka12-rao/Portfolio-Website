import { z } from 'zod';

export const messageCreateSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address').max(150),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000)
});
