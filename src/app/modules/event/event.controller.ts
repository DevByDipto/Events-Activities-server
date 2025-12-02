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

const updateEvent =catchAsync(async (req: Request & { user?: User }, res: Response) =>{
const user = req.user;
const {id} = req.params

    const result = await EventService.updateEvent(user as User,req.body as Partial<Event>,id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Event creat successfull!",
        data: result
    })
})

const deleteEvent = catchAsync(async (req: Request & { user?: User }, res: Response) => {

    const user = req.user;
    const {id} = req.params

    const result = await EventService.deleteEvent(user as User,id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Delete event successFull!",
        data: result
    })
});
const getEvent = catchAsync(async (req: Request , res: Response) => {

   
    const {id} = req.params

    const result = await EventService.getEvent(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "get event successFull!",
        data: result
    })
});

export const EventController ={
    creatEvent,
    updateEvent,
    deleteEvent,
    getEvent
}