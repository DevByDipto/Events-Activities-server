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
 
    router.delete('/:id', 
        auth(UserRole.HOST), 
        EventController.deleteEvent) 

    router.get('/:id', 
        auth(UserRole.HOST,UserRole.ADMIN,UserRole.USER), 
        EventController.getEvent) 
 
 export const eventRoutes = router;