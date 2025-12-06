import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { User } from "@prisma/client";
import { reviewService } from "./review.service";
import { EventService } from "../event/event.service";

const createReview = catchAsync(async (req: Request &{user?:User}, res: Response) => {
    const {eventId}= req.params
    const user = req.user
    const result = await reviewService.createReview(user as User,eventId,req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "review created successfully!",
        data: result
    })
})

const getAllReview = catchAsync(async (req: Request &{user?:User}, res: Response) => {
    const result = await reviewService.getAllReview();
 
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "All review get successfull!",
        data: result
    })
})

const hostsReview = catchAsync(async (req: Request &{user?:User}, res: Response) => {
    const user = req.user
    const result = await reviewService.hostsReview(user as User);
 
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "All review get successfull!",
        data: result
    })
})




export const reviewController = {
    createReview,
    getAllReview,
    hostsReview
}
