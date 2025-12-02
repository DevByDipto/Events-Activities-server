import { Request, Response } from "express"
import catchAsync from "../../shared/catchAsync"
import { Event, User } from "@prisma/client"
import sendResponse from "../../shared/sendResponse";
import httpStatus from 'http-status'
import { EventService } from "./event.service";
const creatEvent =catchAsync(async (req: Request & { user?: User }, res: Response) =>{
const user = req.user;

    const result = await EventService.creatEvent(user as User,req.body as Event);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Event creat successfull!",
        data: result
    })
})


export const EventController ={
    creatEvent
}