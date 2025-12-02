import z from 'zod'
 
export const creatReviewZodSchema = z.object({ 
  rating: z.number()                          
}) 
