import { User } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import { AppError } from "../../utils/AppError";
import httpStatus from 'http-status'
import { number } from "zod";


const createReview =async (user:User,eventId:string,data:any)=>{
    const {rating,comment}= data

    const event =await prisma.event.findUnique({
        where:{id:eventId},
        select:{
            hostId:true 
        }
    })

    if(!event){
        throw new AppError("Your review eventId is not valid",httpStatus.BAD_REQUEST)
    }
    
    const result = prisma.review.create({
        data:{
            reviewerId:user.id,
            rating:Number(rating),
            eventId,
            hostId:event.hostId,
            comment
           
        }
    })
    return result
}

const getAllReview =async ()=>{
    
    const result = prisma.review.findMany()
    return result
}

const hostsReview =async (user:User)=>{
    
    
    const result = prisma.review.findMany({where:{reviewerId:user.id}})
    return result
}


export const reviewService = {
    createReview,
    getAllReview,
    hostsReview
}