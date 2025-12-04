import { NextFunction, Request, Response } from "express"

import { jwtHelper } from "../helpers/jwtHelper"
import { UserRole } from "@prisma/client"
import { prisma } from "../shared/prisma"
export const auth = (...roles: UserRole[]) => {
    return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.accessToken
            console.log(token);

            if (!token) {
                throw new Error("You are not authorized!")
            }
            const verifyUser = jwtHelper.verifyToken(token)
            req.user = verifyUser


            if (roles.length && !roles.includes(verifyUser?.role)) {
                throw new Error("You are not authorized!")
            }

            const user = await prisma.user.findFirstOrThrow({ where: { email: verifyUser.email } })
req.user = user
console.log(user);

            if (user.isBlocked) {
                throw new Error("You are blocked by admin!")
            }

            next()
        } catch (error) {
            next(error)
        }

    }
}