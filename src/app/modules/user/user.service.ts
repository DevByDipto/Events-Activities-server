import { Request } from "express"
import { envVars } from "../../config/env"
import { prisma } from "../../shared/prisma"
import { AppError } from "../../utils/AppError"

import bcrypt from 'bcrypt'
import { User } from "@prisma/client"
import { RegisterUser } from "../../interfaces"
const creatUser =async (payload:RegisterUser)=>{
    const {name,email} = payload
    let {role} = payload
if(!role) role = "USER"
    const isUserExist = await prisma.user.findUnique({where:{ email: payload.email }})
    // console.log(isUserExist);

    if (isUserExist) {
        throw new AppError("user already exist",500)
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
console.log(result);

    return result
}

const getMyProfile = async (user: User) => {
    const userInfo = await prisma.user.findUniqueOrThrow({
        where: {
            email: user.email,
        },
    })
    return userInfo;
        
    

};

const updateMyProfie = async (user: User, req: Request) => {
    const userInfo = await prisma.user.findUniqueOrThrow({
        where: {
            email: user?.email,
        }
    });

   let profileInfo = await prisma.user.update({
            where: {
                email: userInfo.email
            },
            data: req.body
        })

    return profileInfo ;
}

const deleteMyProfile =async(user:User)=>{
const result = await prisma.user.delete({where:{email:user.email}})
return result
}
export const UserService = {
    creatUser,
    getMyProfile,
    updateMyProfie,
    deleteMyProfile
}