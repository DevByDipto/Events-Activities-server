import { Event, User } from "@prisma/client"
import { prisma } from "../../shared/prisma"

const creatEvent = (user:User,eventData:Event)=>{

    const result = prisma.event.create({
            data:eventData
        })
    
        return result
}


export const EventService = {
    creatEvent
}