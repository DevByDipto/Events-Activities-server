import { UserRole } from '@prisma/client';
import express from 'express'
import { auth } from '../../middlewares/auth';
import { validationRequest } from '../../middlewares/validateRequest';
import { SaveEventController } from './saveEvent.controller';

const router = express.Router();


 router.post('/:eventId',
       auth(UserRole.USER,),
    SaveEventController.creatSaveEvent)

 router.get('/',
       auth(UserRole.USER,),
    SaveEventController.getAllSaveEvent)


export const saveEventRoutes = router;