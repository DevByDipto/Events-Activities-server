import { UserRole } from "@prisma/client"

export type RegisterUser = {
    name:string,
    email:string,
    password:string,
    role:'USER'| "HOST"
}

export type CreateAdmin = {
    name:string,
    email:string, 
    password:string,
    role: 'ADMIN'
}
export type CreateHost = {
    name:string,
    email:string, 
    password:string,
    role: 'HOST'
}
export interface GetPaymentsOptions {
  status?: "PAID" | "UNPAID"; // optional filter
}
