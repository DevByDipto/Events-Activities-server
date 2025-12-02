import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

import { UserService } from "./user.service";
import { User } from "@prisma/client";
import httpStatus from "http-status"
const creatUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.creatUser(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Patient created successfully!",
        data: result
    })
})
const getMyProfile = catchAsync(async (req: Request & {user?:User}, res: Response) => {
    const user = req.user
    const result = await UserService.getMyProfile(user as User);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Patient created successfully!",
        data: result
    })
})

const updateMyProfie = catchAsync(async (req: Request & { user?: User }, res: Response) => {

    const user = req.user;

    const result = await UserService.updateMyProfie(user as User, req);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My profile updated!",
        data: result
    })
});

const deleteMyProfile = catchAsync(async (req: Request & { user?: User }, res: Response) => {

    const user = req.user;

    const result = await UserService.deleteMyProfile(user as User);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Delete profile successFull!",
        data: result
    })
});

export const UserController = {
    creatUser,
    getMyProfile,
    updateMyProfie,
    deleteMyProfile
}