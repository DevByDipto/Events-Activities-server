import { Request, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import catchAsync from "../../shared/catchAsync";

const handleStripeWebhook = catchAsync(async (req: Request, res: Response) => {
console.log("work");
    
    const result = await paymentService.handleStripeWebhook(req);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Doctor soft deleted successfully',
        data: result,
    });
});

export const paymentController = {
handleStripeWebhook
}