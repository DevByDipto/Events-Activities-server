import z from 'zod'

export const registerZodSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  pass: z.string().min(6),

});