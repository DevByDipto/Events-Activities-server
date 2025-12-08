import express from 'express'
import { validationRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { EventParticipantsController } from './eventParticipants.controller';


const router = express.Router();

router.get('/user',
    auth(UserRole.ADMIN,UserRole.USER,UserRole.HOST),
    EventParticipantsController.getUserEventParticipants 
)
router.get('/',
    auth(),
    EventParticipantsController.getAllEventParticipants 
)





export const eventParticipantsRoutes = router;