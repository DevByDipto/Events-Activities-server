import { Request, Response } from "express"
import catchAsync from "../../shared/catchAsync"
import { Event, User } from "@prisma/client"
import sendResponse from "../../shared/sendResponse";
import httpStatus from 'http-status'
import { HostService } from "./host.service";
const creatEvent =catchAsync(async (req: Request & { user?: User }, res: Response) =>{
const user = req.user;

    const result = await HostService.creatEvent(user as User,req.body as Event);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Event creat successfull!",
        data: result
    })
})

// const creatHost = catchAsync(async (req: Request, res: Response) => {
  
//     const result = await HostService.creatHost(req.body);

//     sendResponse(res, {
//         statusCode: 201,
//         success: true,
//         message: "Patient created successfully!",
//         data: result
//     })
// })


export const HostController ={
    creatEvent,
    // creatHost
}