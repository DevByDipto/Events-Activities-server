/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import { handleCastError } from "../helpers/handleCastError";
import { handlerDuplicateError } from "../helpers/handleDuplicateError";
import { handlerValidationError } from "../helpers/handlerValidationError";
import { handlerZodError } from "../helpers/handlerZodError";
import { TErrorSources } from "../interfaces/error.types";
import { AppError } from "../utils/AppError";
import httpStatus from 'http-status'
import { Prisma } from "@prisma/client";


export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (envVars.NODE_ENV === "development") {
        // console.log(err);
    }

    let errorSources: TErrorSources[] = []
    let statusCode = 400
    let message = "Something Went Wrong!!"

     if (err instanceof Prisma.PrismaClientValidationError) {
        message = "Validation Error",
            // error = err.message,
            statusCode = httpStatus.BAD_REQUEST
    }   `   `
 if (err instanceof Prisma.PrismaClientKnownRequestError) {

        if (err.code === "P2002") {
            message = "Duplicate key error",
                // error = err.meta,
                statusCode = httpStatus.CONFLICT
        }
    }
        if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        message = "Unknown Prisma error occured!",
            // error = err.message,
            statusCode = httpStatus.BAD_REQUEST
    }

    if (err instanceof Prisma.PrismaClientInitializationError) {
        message = "Prisma client failed to initialize!",
            // error = err.message,
            statusCode = httpStatus.BAD_REQUEST
    }

    //Duplicate error
    if (err.code === 11000) {
        const simplifiedError = handlerDuplicateError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message
    }
    // Object ID error / Cast Error
    else if (err.name === "CastError") {
        const simplifiedError = handleCastError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message
        errorSources = simplifiedError.errorSources as TErrorSources[]
    }
    else if (err.name === "ZodError") {
        const simplifiedError = handlerZodError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorSources = simplifiedError.errorSources as TErrorSources[]
    }
    //Mongoose Validation Error
    else if (err.name === "ValidationError") {
        const simplifiedError = handlerValidationError(err)
        statusCode = simplifiedError.statusCode;
        errorSources = simplifiedError.errorSources as TErrorSources[]
        message = simplifiedError.message
    }
    else if (err instanceof AppError) {
        statusCode = err.statusCode
        message = err.message
    } else if (err instanceof Error) {
        statusCode = 500;
        message = err.message
    }

   console.log("err",err);
   

    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        statusCode:statusCode,
        err:envVars.NODE_ENV === "development" ? err : null,
        stack: envVars.NODE_ENV === "development" ? err.stack : null
    })
}