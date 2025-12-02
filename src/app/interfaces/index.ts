import { UserRole } from "@prisma/client"

export type RegisterUser = {
    name:string,
    email:string,
    password:string
}

export type CreateAdmin = {
    name:string,
    email:string,
    password:string,
    role: 'ADMIN'
}

