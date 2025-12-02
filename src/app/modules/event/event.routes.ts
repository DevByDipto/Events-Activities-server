 import express from 'express'
 import { validationRequest } from '../../middlewares/validateRequest';
 import { auth } from '../../middlewares/auth';
 import { UserRole } from '@prisma/client';
import { EventController } from './event.controller';
import { eventCreatZodSchema, eventUpdateZodSchema } from './event.validation';
 const router = express.Router();
 
 router.post('/',
       auth(UserRole.HOST,),
     validationRequest(eventCreatZodSchema),
    EventController.creatEvent)

 router.patch('/:id',
       auth(UserRole.HOST,),
     validationRequest(eventUpdateZodSchema),
    EventController.updateEvent)
 
 
 export const eventRoutes = router;