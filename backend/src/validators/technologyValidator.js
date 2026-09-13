import { z } from 'zod';

export const technologyCreateSchema = z.object({
  name: z.string().min(1, 'Name is required').max(80),
  category: z.enum(['Languages', 'Frontend', 'Backend', 'Tools'], {
    errorMap: () => ({ message: 'Category must be one of Languages, Frontend, Backend, or Tools' })
  }),
  icon: z.string().optional().default('Code2'),
  order: z.number().int().optional().default(0),
  visible: z.boolean().optional().default(true)
});

export const technologyUpdateSchema = technologyCreateSchema.partial();
