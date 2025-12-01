import { log } from "console"
import { NextFunction, Request, Response } from "express"
import { ZodSchema  } from "zod"

export const validationRequest = (zodSchema:ZodSchema) => async(req: Request, res: Response, next: NextFunction) => {
    try {
      const result=  await zodSchema.parseAsync(req.body)
      req.body = result;
      // console.log(result);
        next()
    } catch (error) {
        next(error)
    } 
 }