import { envVars } from "../../config/env"
import { prisma } from "../../shared/prisma"
import { AppError } from "../../utils/AppError"
import { RegisterUser } from "./user.interface"
import bcrypt from 'bcrypt'
const creatUser =async (payload:RegisterUser)=>{
    const {name,email} = payload

    const isUserExist = await prisma.user.findUnique({where:{ email: payload.email }})
    // console.log(isUserExist);

    if (isUserExist) {
        throw new AppError("user already exist",500)
    }

    const salt = bcrypt.genSaltSync(Number(envVars.SALT));
    const haspassword = bcrypt.hashSync(payload.pass as string, salt)
    payload.pass = haspassword
    const result = prisma.user.create({
        data:{
            name,
            email,
            pass:haspassword
        }
    })

    return result
}

export const UserService = {
    creatUser
}