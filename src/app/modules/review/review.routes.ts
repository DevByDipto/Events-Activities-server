import express from 'express'
import { validationRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { creatReviewZodSchema } from './review.validation';
import { reviewController } from './review.controller';

const router = express.Router();
   
 router.post('/:eventId',
          auth(UserRole.USER),
validationRequest(creatReviewZodSchema),
    reviewController.createReview)
         
// router.get('/review',
//     routerController.getAllReview
// )


export const reviewRoutes = router;