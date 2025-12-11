/* eslint-disable @typescript-eslint/no-unused-vars */
// import mongoose from "mongoose"
// import { TGenericErrorResponse } from "../interfaces/error.types"

// export const handleCastError = (err: mongoose.Error.CastError): TGenericErrorResponse => {

//     return {
//         statusCode: 400,
//         message: "Invalid MongoDB ObjectID. Please provide a valid id"
//     }
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from "../interfaces/error.types"

export const handleCastError = (err: any): TGenericErrorResponse => {
    const errorSources: TErrorSources[] = []

    errorSources.push({
            //path : "nickname iside lastname inside name"
            // path: issue.path.length > 1 && issue.path.reverse().join(" inside "),

            path: err.path,
            message: err.message
        })

    return {
        statusCode: 400,
        message: "Cast Error",
        errorSources

    }
}