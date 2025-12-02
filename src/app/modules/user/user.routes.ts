import express from 'express'
import { UserController } from './user.controller';
import { validationRequest } from '../../middlewares/validateRequest';
import { registerZodSchema, userZodSchema } from './user.validation';
import { auth } from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
const router = express.Router();

router.post('/register',
    validationRequest(registerZodSchema),
    UserController.creatUser)

router.get('/me',
    auth(UserRole.ADMIN, UserRole.HOST, UserRole.USER),
   
    UserController.getMyProfile
) 

router.patch('/updateMyProfie', 
    auth(UserRole.ADMIN, UserRole.HOST, UserRole.USER),
    validationRequest(userZodSchema),
    UserController.updateMyProfie )

// router.get('/details',
    
//     UserController.userDetails)

// router.patch('/',
    
//     UserController.UpdateUserDetails)

router.delete('/',
    auth(UserRole.ADMIN, UserRole.HOST, UserRole.USER),
    UserController.deleteMyProfile)

export const userRoutes = router;