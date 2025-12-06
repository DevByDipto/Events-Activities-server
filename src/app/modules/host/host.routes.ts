 import express from 'express'
 import { validationRequest } from '../../middlewares/validateRequest';
 import { auth } from '../../middlewares/auth';
 import { UserRole } from '@prisma/client';
import { hostCreatZodSchema } from './host.validation';
import { HostController } from './host.controller';
import { eventCreatZodSchema } from '../event/event.validation';
 const router = express.Router();
 
 router.patch('/',
       auth(UserRole.ADMIN,), 
     validationRequest(eventCreatZodSchema),
    HostController.creatEvent)
 
    // router.post('/',
    //     //    auth(UserRole.ADMIN),
    //     validationRequest(hostCreatZodSchema),
    //    HostController.creatHost)
 
 export const userRoutes = router;