import { z } from 'zod';

export const projectCreateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(150),
  slug: z.string().min(1).max(150).regex(/^[a-z0-9-]+$/, 'Slug must only contain lowercase alphanumeric characters and hyphens').optional(),
  description: z.string().min(1, 'Description is required'),
  technologies: z.array(z.string()).default([]),
  image: z.string().optional().default(''),
  githubUrl: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
  liveUrl: z.string().url('Invalid Live URL').optional().or(z.literal('')),
  featured: z.boolean().optional().default(false),
  order: z.number().int().optional().default(0),
  published: z.boolean().optional().default(true)
});

export const projectUpdateSchema = projectCreateSchema.partial();
