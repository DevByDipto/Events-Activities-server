import { Request, Response } from "express";
import httpStatus from "http-status";
import { User } from "@prisma/client";
import catchAsync from "../../shared/catchAsync";
import { EventParticipantsService } from "./EventParticipants.service";
import sendResponse from "../../shared/sendResponse";

 const  getAllEventParticipants=catchAsync(async (req: Request &{user?:User}, res: Response) => {
    const user = req.user;

    const result = await EventParticipantsService.getAllEventParticipants(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Event participants fetched successfully",
      data: result,
    });
  })


export const EventParticipantsController = {
    getAllEventParticipants
}
