import { Request, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import catchAsync from "../../shared/catchAsync";
import { paymentService } from "./payemt.service";
import { User } from "@prisma/client";
import { AppError } from "../../utils/AppError";

const handleStripeWebhook = catchAsync(async (req: Request, res: Response) => {
// console.log("work");
    
    const result = await paymentService.handleStripeWebhook(req);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: '',
        data: result,
    });
});

const getPaymentForHost = catchAsync(async (req: Request&{user?:User}, res: Response) => {
    const user = req.user
    const result = await paymentService.getPaymentForHost(user as User);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'get host payment successfully',
        data: result,
    });
});

const getPayments = catchAsync(async (req: Request&{user?:User}, res: Response) => {
    const user = req.user
    const options = req.params
    const result = await paymentService.getPayments(user as User,options);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'get host payment successfully',
        data: result,
    });
});
const getSinglePayment = catchAsync(async (req: Request&{user?:User}, res: Response) => {
    const {userId,eventId} = req.params
    if(!userId || !eventId){
        throw new AppError("must provide useId and eventId in search params",400)
    }
    const result = await paymentService.getSinglePayment(userId,eventId);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'get host payment successfully',
        data: result,
    });
});

export const paymentController = {
handleStripeWebhook,
getPaymentForHost,
getPayments,
getSinglePayment
}