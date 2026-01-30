import { z } from 'zod';

export const loginValidationSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters long'),
    }),
});


export const inviteValidationSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email address'),
        role: z.enum(['ADMIN', 'MANAGER', 'STAFF'], {
            message: "Role must be 'ADMIN', 'MANAGER', or 'STAFF'",
        }),
    }),
});