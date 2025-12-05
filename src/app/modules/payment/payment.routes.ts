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





export const paymentsRoutes = router;