import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from 'http-status'
import { setCookie } from "../../helpers/setCookie";
import { prisma } from "../../shared/prisma";

const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
if(req?.body?.email){
    const user = await prisma.user.findUnique({ where: { email: req.body.email,isBlocked:true } })
    if (user) {
        throw new Error("You are blocked by admin!")
    }
}
    const result = await AuthService.login(req.body);
    // console.log(result,"result");
    
    const { accessToken, refreshToken, user } = result;
    const userToken = {
        accessToken,
        refreshToken
    }
    setCookie(res, userToken);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Patient logged in successfully",
        data: {
            user,
        },
    });
})

// const refreshToken = catchAsync(async (req: Request, res: Response) => {
//     const { refreshToken } = req.cookies;

//     const result = await AuthService.refreshToken(refreshToken);
// const userToken={
//    accessToken: result.accessToken
// }
//     setCookie(res,userToken )

 

//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "Access token genereated successfully!",
//         data: {
//             message: "Access token genereated successfully!",
//         },
//     });
// });

// const changePassword = catchAsync(
//     async (req: Request & { user?: any }, res: Response) => {
//         const user = req.user;

//         const result = await AuthService.changePassword(user, req.body);

//         sendResponse(res, {
//             statusCode: httpStatus.OK,
//             success: true,
//             message: "Password Changed successfully",
//             data: result,
//         });
//     }
// );

// const getMe = catchAsync(async (req: Request, res: Response) => {
//     const userSession = req.cookies;
//     const result = await AuthService.getMe(userSession);

//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "User retrive successfully!",
//         data: result,
//     });
// });
const getMe = (req: Request, res: Response) => {
//    console.log("");
   
}

// const forgotPassword = catchAsync(async (req: Request, res: Response) => {
//     await AuthService.forgotPassword(req.body);

//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "Check your email!",
//         data: null,
//     });
// });

// const resetPassword = catchAsync(async (req: Request, res: Response) => {
//     // const token = req.headers.authorization || "";  // headers.authorization keno use korlo ? (support)
//     const { token } = req.query 

//     await AuthService.resetPassword(token as string, req.body);

//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "Password Reset!",
//         data: null,
//     });
// });

export const AuthController = {
    login,
    // refreshToken,
    // changePassword,
    getMe,
    // forgotPassword,
    // resetPassword
}