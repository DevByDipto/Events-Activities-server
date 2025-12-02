import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { SaveEventService } from "./saveEvent.service";
import sendResponse from "../../shared/sendResponse";
import { User } from "@prisma/client";

const creatSaveEvent = catchAsync(async (req: Request & {user:User}, res: Response) => {
    const user = req.user
    const {eventId} = req.params
    const result = await SaveEventService.creatSaveEvent(user as User,eventId);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Patient created successfully!",
        data: result
    })
})

export const SaveEventController = {
    creatSaveEvent,
 
}