import { z } from 'zod';

export const updateUserRoleValidationSchema = z.object({
    body: z.object({
        role: z.enum(['ADMIN', 'MANAGER', 'STAFF'], {
            message: "Role must be 'ADMIN', 'MANAGER', or 'STAFF'",
        }),
    }),
});