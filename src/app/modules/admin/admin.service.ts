import { UserRole } from "@prisma/client"
import { prisma } from "../../shared/prisma"
import { AppError } from "../../utils/AppError"
import bcrypt from 'bcrypt'
import { envVars } from "../../config/env"
import { CreateAdmin, RegisterUser } from "../../interfaces"
const creatHost =async (userId:string)=>{

    const result = prisma.user.update({
       where:{
        id:userId,
        role:UserRole.USER
       },
       data:{
        role:UserRole.HOST
       }
    })

    return result
}

const creatAdmin =async (payload:CreateAdmin)=>{

   const {name,email,role} = payload
   
       const isUserExist = await prisma.user.findUnique({where:{ email: payload.email }})
       // console.log(isUserExist);
   
       if (isUserExist) {
           throw new AppError("Admin already exist",500)
       }
   
       const salt = bcrypt.genSaltSync(Number(envVars.SALT));
       const haspassword = bcrypt.hashSync(payload.password as string, salt)
       payload.password = haspassword

       const result = prisma.user.create({
           data:{
               name,
               email,
               password:haspassword,
               role,
           }
       })
   
       return result
}

const getAllUser =async ()=>{

 const allAdmins = prisma.user.findMany({
    where:{role:UserRole.ADMIN}
 })
   
       return allAdmins
}

export const AdminService ={
creatHost,
creatAdmin,
getAllUser
}