import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { RegisterUser } from "./user.interface";
import { UserService } from "./user.service";

const creatUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.creatUser(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Patient created successfully!",
        data: result
    })
})

export const UserController = {
    creatUser,
    
}