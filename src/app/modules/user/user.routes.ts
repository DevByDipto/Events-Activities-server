import express from 'express'
import { UserController } from './user.controller';
import { validationRequest } from '../../middlewares/validateRequest';
import { registerZodSchema } from './user.validation';
const router = express.Router();

router.post('/register',
    validationRequest(registerZodSchema),
    UserController.creatUser)

// router.post('/profile',
    
//     UserController.updateProfile)

// router.get('/me',
    
//     UserController.userProfile)

// router.get('/details',
    
//     UserController.userDetails)

// router.patch('/',
    
//     UserController.UpdateUserDetails)

// router.patch('/',
    
//     UserController.UpdateUserDetails)

export const userRoutes = router;