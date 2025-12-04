 import express from 'express'
 import { validationRequest } from '../../middlewares/validateRequest';
 import { auth } from '../../middlewares/auth';
 import { UserRole } from '@prisma/client';
import { EventController } from './event.controller';
import { creatReviewZodSchema, eventCreatZodSchema, eventUpdateZodSchema } from './event.validation';


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

         router.post('/:eventId/join',
       auth(UserRole.USER,),
    EventController.joinEvent)

    router.get('/', 
       
        EventController.getAllEvent) 
 
 export const eventRoutes = router;