import { Event, User } from "@prisma/client"
import { prisma } from "../../shared/prisma"
import { CreateHost } from "../../interfaces"
import { AppError } from "../../utils/AppError"
import bcrypt from "bcrypt"
import { envVars } from "../../config/env"
const creatEvent = (user:User,eventData:Event)=>{

    const result = prisma.event.create({
            data:eventData
        })
    
        return result
}

// const creatHost =async (payload:CreateHost)=>{

//    const {name,email,role} = payload
   
//        const isUserExist = await prisma.user.findUnique({where:{ email: payload.email }})
//        // console.log(isUserExist);
   
//        if (isUserExist) {
//            throw new AppError("Admin already exist",500)
//        }
   
//        const salt = bcrypt.genSaltSync(Number(envVars.SALT));
//        const haspassword = bcrypt.hashSync(payload.password as string, salt)
//        payload.password = haspassword

//        const result = prisma.user.create({
//            data:{
//                name,
//                email,
//                password:haspassword,
//                role,
//            }
//        })
   
//        return result
// }

export const HostService = {
    creatEvent,
    // creatHost
}