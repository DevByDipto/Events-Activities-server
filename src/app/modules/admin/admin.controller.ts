import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AdminService } from "./admin.service";

const creatAdmin = catchAsync(async (req: Request, res: Response) => {
  
    const result = await AdminService.creatAdmin(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Patient created successfully!",
        data: result
    })
})

const creatHost = catchAsync(async (req: Request, res: Response) => {
    const {userId} = req.params
    const result = await AdminService.creatHost(userId);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Patient created successfully!",
        data: result
    })
})

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
 
    const result = await AdminService.getAllAdmin();

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Patient created successfully!",
        data: result
    })
})

const updateUserBlockStatus = catchAsync(async (req: Request, res: Response) => {
 
    const {accountId} = req.params
    const result = await AdminService.updateUserBlockStatus(accountId,req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "update blocked status successfully!",
        data: result
    })
})

const getAllHost = catchAsync(async (req: Request, res: Response) => {
 
    
    const result = await AdminService.getAllHost();

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "update blocked status successfully!",
        data: result
    })
})
const getAllUser = catchAsync(async (req: Request, res: Response) => {
 
    
    const result = await AdminService.getAllUser();

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "update blocked status successfully!",
        data: result
    })
})

const updateEventApproval = catchAsync(async (req: Request, res: Response) => {
 
    const {eventId} = req.params
    const result = await AdminService.updateEventApproval(eventId,req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "update blocked status successfully!",
        data: result
    })
})

export const AdminController = {
creatHost,
creatAdmin,
getAllAdmin,
updateUserBlockStatus,
getAllHost,
getAllUser,
updateEventApproval
}