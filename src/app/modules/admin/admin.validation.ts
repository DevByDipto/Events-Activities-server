import { UserRole } from "@prisma/client";
import z from "zod"

export const adminCreatZodSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string(UserRole.ADMIN)
});

export const updateUserBlockStatusZodSchema = z.object({
  isBlocked: z.boolean(),
});

export const updateEventApprovalZodSchema = z.object({
  isApproved: z.boolean(),
});