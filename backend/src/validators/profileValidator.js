import { z } from 'zod';

export const profileUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100).optional(),
  headline: z.string().max(200).optional(),
  bio: z.string().max(2000).optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  github: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
  linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  resumeUrl: z.string().optional()
});
