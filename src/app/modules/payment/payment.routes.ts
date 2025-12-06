import express from 'express'
import { validationRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { paymentController } from './payemt.controller';
import { UserRole } from '@prisma/client';


const router = express.Router();

         
router.get('/host',
    auth(UserRole.HOST),
    paymentController.getPaymentForHost 
)

router.get('/',
    auth(UserRole.ADMIN,UserRole.USER),
    paymentController.getPayments
)

router.get('/',
    auth(UserRole.ADMIN,UserRole.USER,UserRole.HOST),
    paymentController.getSinglePayment
)





export const paymentsRoutes = router;