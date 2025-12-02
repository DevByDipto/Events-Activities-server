import express from 'express'
import { auth } from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { validationRequest } from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { adminCreatZodSchema } from './admin.validation';

const router = express.Router();

router.post('/',
    //    auth(UserRole.ADMIN),
    validationRequest(adminCreatZodSchema),
    AdminController.creatAdmin)

router.patch('/users/:userId/make-host',
       auth(UserRole.ADMIN),
    AdminController.creatHost)

// router.get('/all-uses',

//     AdminController.getAllUser
// )

// router.get('/all-hosts',
 
//     AdminController.getAllHost
// )

// router.get('/all-event',

//     AdminController.getAllEvent
// )




export const adminRoutes = router;