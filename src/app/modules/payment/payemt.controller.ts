import { Request, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import catchAsync from "../../shared/catchAsync";
import { paymentService } from "./payemt.service";
import { User } from "@prisma/client";

const handleStripeWebhook = catchAsync(async (req: Request, res: Response) => {
console.log("work");
    
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
    const result = await paymentService.getPaymentForHost(user as user);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'get host payment successfully',
        data: result,
    });
});

export const paymentController = {
handleStripeWebhook,
getPaymentForHost
}