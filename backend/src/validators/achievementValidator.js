import { z } from 'zod';

export const achievementCreateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(150),
  organization: z.string().min(1, 'Organization is required').max(150),
  description: z.string().optional().default(''),
  date: z.string().optional().default(''),
  certificateUrl: z.string().url('Invalid Certificate URL').optional().or(z.literal('')),
  image: z.string().optional().default(''),
  order: z.number().int().optional().default(0),
  visible: z.boolean().optional().default(true)
});

export const achievementUpdateSchema = achievementCreateSchema.partial();
