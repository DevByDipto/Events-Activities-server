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


export const SaveEventService = {
    creatSaveEvent
 
}