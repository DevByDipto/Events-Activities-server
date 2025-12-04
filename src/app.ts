import express from "express"
import notFound from "./app/middlewares/notFound"
import { globalErrorHandler } from "./app/middlewares/globalErrorHandelar"
import cors from "cors"
import { router } from "./app/routes"
import { envVars } from "./app/config/env"
import cron from "node-cron"
import cookieParser from "cookie-parser"
import { paymentController } from "./app/modules/payment/payemt.controller"
import { EventService } from "./app/modules/event/event.service"

export const app = express()

app.post(
  "/webhook",
  express.raw({ type: "application/json" }), // raw body for stripe verification
  paymentController.handleStripeWebhook
);

app.use(cors({
    origin: "http:localhost:3000",
    credentials: true,
  }))
// app.options('*', cors());
app.use(cookieParser())
app.use(express.json())


cron.schedule('* * * * *', () => {
    try {
        console.log("Node cron called at ", new Date())
        EventService.cancelUnpaidevent();
    } catch (err) {
        console.error(err);
    }
});

app.use('/api/v1',router)


app.get('/', (req, res) => {
  res.send('welocome to Events & Activities')
})

app.use(globalErrorHandler)
app.use(notFound)   