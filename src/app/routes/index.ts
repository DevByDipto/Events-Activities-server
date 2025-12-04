import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";
import { adminRoutes} from "../modules/admin/admin.routes";
import { eventRoutes } from "../modules/event/event.routes";
import { saveEventRoutes } from "../modules/saveEvent/saveEvent.routes";
import { reviewRoutes } from "../modules/review/review.routes";
import { eventParticipantsRoutes } from "../modules/EventParticipants/eventParticipants.route";



export const router = Router()

const routes= [
   {path:'/auth',
    route:authRoutes
   },
   {path:'/users',
    route:userRoutes
   },
//    {path:'/host',
//     route:hostRoutes
//    },
   {path:'/admins',
    route:adminRoutes
   },
   {path:'/events',
    route:eventRoutes
   },
   {path:'/save-events',
    route:saveEventRoutes
   },
   {path:'/reviews',
    route:reviewRoutes
   },
   {path:'/event-participants',
    route:eventParticipantsRoutes
   },
   
]

routes.forEach((route)=>router.use(route.path,route.route))

  