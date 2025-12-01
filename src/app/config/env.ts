import dotenv from "dotenv"
dotenv.config() // keno dilam ?


const loadEnvVariable = () => { // aikhane to ami bole e dicchi j PORT: process.env.PORT as string mane port string hobe tahole abar EnvConfig korar dorkar kii?
    const requredEnvVariables: string[] = ["PORT", "NODE_ENV", "SESSION_SECRET", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "SALT","JWT_ACCESS_SECRET","JWT_REFRESH_SECRET","JWT_ACCESS_EXPIRES","JWT_REFRESH_EXPIRES","CLIENT_URL",
        // "CLIENT_DOMAIN"
    ]
    requredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing require enviroment variable ${key}`)
        }
    })
    return {
        PORT: process.env.PORT as string,
        NODE_ENV: process.env.NODE_ENV as string,
        SESSION_SECRET: process.env.SESSION_SECRET as string,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
        SALT: process.env.SALT as string,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
        CLIENT_URL: process.env.CLIENT_URL as string,
        // CLIENT_DOMAIN: process.env.CLIENT_DOMAIN as string,
    }
}


export const envVars = loadEnvVariable()

