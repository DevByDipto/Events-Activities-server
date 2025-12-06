import express from 'express'
import { auth } from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { validationRequest } from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { adminCreatZodSchema, updateEventApprovalZodSchema, updateUserBlockStatusZodSchema } from './admin.validation';

const router = express.Router();

router.post('/',
    //    auth(UserRole.ADMIN),
    validationRequest(adminCreatZodSchema),
    AdminController.creatAdmin)

router.patch('/users/:userId/make-host',
       auth(UserRole.ADMIN),
    AdminController.creatHost)

router.get('/all-admin',
auth(UserRole.ADMIN),
    AdminController.getAllAdmin
)

router.patch('/accounts/:accountId/block',
auth(UserRole.ADMIN),
validationRequest(updateUserBlockStatusZodSchema),
    AdminController.updateUserBlockStatus
)
router.get('/all-hosts',
auth(UserRole.ADMIN),
    AdminController.getAllHost
)
router.get('/all-user',
    AdminController.getAllUser
)

router.patch('/event/:eventId/approve',
auth(UserRole.ADMIN),
validationRequest(updateEventApprovalZodSchema),
    AdminController.updateEventApproval
)

// router.get('/all-event',

//     AdminController.getAllEvent
// )




export const adminRoutes = router;