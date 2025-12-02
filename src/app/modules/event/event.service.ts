import { Event, User } from "@prisma/client"
import { prisma } from "../../shared/prisma"
import { AppError } from "../../utils/AppError"
import  httpStatus  from "http-status"
const creatEvent = (user:User,eventData:Event)=>{

    const result = prisma.event.create({
            data:{...eventData,hostId:user.id}
        })
    
        return result
}

const updateEvent = (user:User,eventData:Partial<Event>,id:string)=>{

    if(Object.keys(eventData).length == 0){
        throw new AppError("you should provide at least a event field",httpStatus.BAD_REQUEST)
    }
    const result = prisma.event.update({
        where:{
        hostId:user.id,
        id,
        isApproved:true
        },
            data:eventData
        })
    
        return result
}

const deleteEvent =async(user:User,id:string)=>{
const result = await prisma.event.delete({where:{hostId:user.id,id,}})
return result
}

const getEvent =async(id:string)=>{
const result = await prisma.event.findFirstOrThrow({where:{id,}})
return result
}

export const EventService = {
    creatEvent,
    updateEvent,
    deleteEvent,
    getEvent
}