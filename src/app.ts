import express from "express"
import notFound from "./app/middlewares/notFound"
import { globalErrorHandler } from "./app/middlewares/globalErrorHandelar"
import cors from "cors"
import { router } from "./app/routes"
import { envVars } from "./app/config/env"


import cookieParser from "cookie-parser"

export const app = express()


app.use(cors({
    origin: "http:localhost:3000",
    credentials: true,
  }))
// app.options('*', cors());
app.use(cookieParser())
app.use(express.json())



app.use('/api/v1',router)


app.get('/', (req, res) => {
  res.send('welocome to Events & Activities')
})

app.use(globalErrorHandler)
app.use(notFound)   