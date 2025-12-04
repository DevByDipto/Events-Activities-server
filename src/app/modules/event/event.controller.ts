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
console.log("work in get event");

   
    const {id} = req.params

    const result = await EventService.getEvent(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "get event successFull!",
        data: result
    })
});

const joinEvent =catchAsync(async (req: Request & { user?: User }, res: Response) =>{
const user = req.user;
const {eventId} = req.params
    const result = await EventService.joinEvent(user as User,eventId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Event creat successfull!",
        data: result
    })
})

const getAllEvents = catchAsync(async (req: Request , res: Response) => {

    const filters = req.query;   // সব query এখানেই আসবে

    const result = await EventService.getAllEvents(filters);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Get all event successFull!",
        data: result
    })
});

const getHostCreatedAllEvents = catchAsync(async (req: Request &{user?:User} , res: Response) => {
    console.log("work");
    
const user = req.user
    

    const result = await EventService.getHostCreatedAllEvents(user as User);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Get all event creat by host successFull!",
        data: result
    })
});


export const EventController ={
    creatEvent,
    updateEvent,
    deleteEvent,
    getEvent,
  joinEvent,
  getAllEvents,
  getHostCreatedAllEvents
}