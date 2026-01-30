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


export const registerViaInviteValidationSchema = z.object({
    body: z.object({
        token: z.string().min(1, 'Token is required'),
        name: z.string().min(2, 'Name must be at least 2 characters long'),
        password: z.string().min(6, 'Password must be at least 6 characters long'),
    }),
});
