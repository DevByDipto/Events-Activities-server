import z from 'zod'
 
export const creatReviewZodSchema = z.object({ 
  rating: z.string(),
  comment: z.string()                        
}) 
