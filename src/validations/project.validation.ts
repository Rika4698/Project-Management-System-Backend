import { z } from 'zod';

export const createProjectValidationSchema = z.object({
    body: z.object({
        name: z.string().min(3, 'Project name must be at least 5 characters long'),
        description: z.string().optional(),
    }),
});