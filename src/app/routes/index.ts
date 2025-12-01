import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";



export const router = Router()

const routes= [
   {path:'/auth',
    route:authRoutes
   },
   {path:'/user',
    route:userRoutes
   },
//    {path:'/host',
//     route:hostRoutes
//    },
//    {path:'/admin',
//     route:adminRoutes
//    },
//    {path:'/event',
//     route:eventRoutes
//    },
//    {path:'/review',
//     route:reviewRoutes
//    },
   
]

routes.forEach((route)=>router.use(route.path,route.route))

  