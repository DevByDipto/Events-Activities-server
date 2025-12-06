import { UserRole } from "@prisma/client";
import z from "zod"

export const hostCreatZodSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string(UserRole.HOST)
});