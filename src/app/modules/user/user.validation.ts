import { UserRole } from '@prisma/client';
import z from 'zod'

export const registerZodSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
    role: z.string(UserRole.HOST).optional()

});


export const userZodSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  password: z.string().min(6, "Password too short").optional(),
  interests: z.array(z.string()).default([]).optional(),
  image: z.string().url().optional().nullable(),
  bio: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
});



