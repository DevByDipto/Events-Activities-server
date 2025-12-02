import { User } from "@prisma/client"
import { prisma } from "../../shared/prisma"

const creatSaveEvent =async (user:User,eventId:string)=>{

    const result = prisma.saveEvent.create({
        data:{
            userId:user.id,
            eventId,
        }
    })
    return result
}

const getAllSaveEvent =async (user:User)=>{

    const result = prisma.saveEvent.findMany({
        where:{userId:user.id}
    })
    return result

}


export const SaveEventService = {
    creatSaveEvent,
    getAllSaveEvent
 
}