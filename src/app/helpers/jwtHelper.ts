import { User } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { envVars } from '../config/env';




const accessToken =(user:User)=>{ 

 return jwt.sign({ email: user.email, role: user.role }, envVars.JWT_ACCESS_SECRET as string, { expiresIn: '1d' });
 }


 const refreshToken =(user:User)=>{
return jwt.sign({ email: user.email, role: user.role }, envVars.JWT_ACCESS_SECRET as string, { expiresIn: '90d' });
}

 

 const verifyToken = (token:string) => {
  return jwt.verify(token, envVars.JWT_ACCESS_SECRET as string) as JwtPayload;
};

export const jwtHelper = {
   accessToken,
    refreshToken,
  verifyToken,
};