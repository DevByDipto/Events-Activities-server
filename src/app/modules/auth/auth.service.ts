import { User} from "@prisma/client";
import { prisma } from "../../shared/prisma";
import bcrypt from 'bcrypt';
// import emailSender from "./emailSender";
import httpStatus from 'http-status'
import { AppError } from "../../utils/AppError";
import { envVars } from "../../config/env";
import { jwtHelper } from "../../helpers/jwtHelper";

const login = async (payload:User) => {

     const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
        }
    })
 

    const isCorrectPassword = await bcrypt.compare(payload.password, user.password);
    if (!isCorrectPassword) {
        throw new Error("Password is incorrect!")
    }

    const accessToken = jwtHelper.accessToken(user)
    const refreshToken = jwtHelper.refreshToken(user)
    // Implement login logic here
    return { 
       accessToken,
       refreshToken,
       user,
       
     };
}

// const refreshToken = async (token: string) => {
//     let decodedData;
//     try {
//         decodedData = jwtHelper.verifyToken(token);
//     }
//     catch (err) {
//         throw new Error("You are not authorized!")
//     }

//     const userData = await prisma.user.findUniqueOrThrow({
//         where: {
//             email: decodedData.email,
//             status: UserStatus.ACTIVE
//         }
//     });

//     const accessToken = jwtHelper.accessToken(userData)


//     return {
//         accessToken,
//         needPasswordChange: userData.needPasswordChange
//     };

// };


// const changePassword = async (user: any, payload: any) => {
//     const userData = await prisma.user.findUniqueOrThrow({
//         where: {
//             email: user.email,
//             status: UserStatus.ACTIVE
//         }
//     });

//     const isCorrectPassword: boolean = await bcrypt.compare(payload.oldPassword, userData.password);

//     if (!isCorrectPassword) {
//         throw new Error("Password incorrect!")
//     }

//     const hashedPassword: string = await bcrypt.hash(payload.newPassword, Number(envVars.SALT));

//     await prisma.user.update({
//         where: {
//             email: userData.email
//         },
//         data: {
//             password: hashedPassword,
//             needPasswordChange: false // keno dilam(support)
//         }
//     })

//     return {
//         message: "Password changed successfully!"
//     }
// };


// const getMe = async (session: any) => {
//      // aii route aito others info gulo add kore akbare pathai dite partam tahole aldha kore abar user endpoint e me endpoint keno banano holo ? (support)
     
//     const accessToken = session.accessToken;
//     const decodedData = jwtHelper.verifyToken(accessToken);

//     const userData = await prisma.user.findUniqueOrThrow({
//         where: {
//             email: decodedData.email,
//             status: UserStatus.ACTIVE
//         }
//     })

//     const { id, email, role, needPasswordChange, status } = userData;

//     return {
//         id,
//         email,
//         role,
//         needPasswordChange,
//         status
//     }

// }

// // const forgotPassword = async (payload: { email: string }) => {
// //     const userData = await prisma.user.findUniqueOrThrow({
// //         where: {
// //             email: payload.email,
// //             status: UserStatus.ACTIVE
// //         }
// //     });

// //     const resetPassToken = jwtHelper.accessToken(userData)

// //     const resetPassLink = config.reset_pass_link + `?userId=${userData.id}&token=${resetPassToken}`

// //     await emailSender(
// //         userData.email,
// //         `
// //         <div>
// //             <p>Dear User,</p>
// //             <p>Your password reset link 
// //                 <a href=${resetPassLink}>
// //                     <button>
// //                         Reset Password
// //                     </button>
// //                 </a>
// //             </p>

// //         </div>
// //         `
// //     )
// // };

// const resetPassword = async (token: string, payload: { id: string, newPassword: string }) => {

//     const userData = await prisma.user.findUniqueOrThrow({
//         where: { // userid use korate risky hoi gelo nah ?(support)
//             id: payload.id,
//             status: UserStatus.ACTIVE
//         }
//     });

//     const isValidToken = jwtHelper.verifyToken(token)

//     if (!isValidToken) {
//         throw new AppError("Forbidden!",httpStatus.FORBIDDEN)
//     }

// console.log(payload);

//     // hash password
//     const password = await bcrypt.hash(payload.newPassword, Number(envVars.SALT));
// console.log("password",password);

//     // update into database
//     await prisma.user.update({
//         where: {
//             id: payload.id
//         },
//         data: {
//             password
//         }
//     })
// }; 

export const AuthService = {
    login,
//     refreshToken,
//     changePassword,
//     getMe,
//      forgotPassword,
//     resetPassword
}