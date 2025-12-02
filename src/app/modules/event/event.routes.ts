 import express from 'express'
 import { validationRequest } from '../../middlewares/validateRequest';
 import { auth } from '../../middlewares/auth';
 import { UserRole } from '@prisma/client';
import { eventZodSchema } from './event.validation';
import { EventController } from './event.controller';
 const router = express.Router();
 
 router.post('/',
       auth(UserRole.HOST,),
     validationRequest(eventZodSchema),
    EventController.creatEvent)
 
 
 export const eventRoutes = router;