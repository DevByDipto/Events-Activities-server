import { Request } from "express";
import Stripe from "stripe";
import { prisma } from "../../shared/prisma";
import { PaymentStatus } from "@prisma/client";
import { stripe } from "../../helpers/strip";

 const handleStripeWebhook= async(req: Request) =>{ 
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
 console.log("console.log(process.env.STRIPE_WEBHOOK_SECRET): ",process.env.STRIPE_WEBHOOK_SECRET);
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig as string,
        endpointSecret
      );
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      throw new Error("Invalid signature");
    }

   
      
//     if (event.type === 'payment_intent.payment_failed') {
//     const paymentIntent = event.data.object;

//  const eventdata = await prisma.event.findUniqueOrThrow({where:{id:eventId}})

// await prisma.event.update({
//   where:{id:eventId},
//  data:{currentParticipants:(eventdata.currentParticipants - 1)}
// })
//     console.log("Payment Failed ❌");
//     console.log("Error Message:", paymentIntent.last_payment_error?.message);
//     console.log("Error Code:", paymentIntent.last_payment_error?.code);

//     // এখানে তুমি order status, booking status update করতে পারবে
//   }

    if (event.type === "checkout.session.completed") {
       const session = event.data.object as Stripe.Checkout.Session;
      const transactionId = session.payment_intent as string;
      const eventId = session?.metadata?.eventId;
      const paymentId = session?.metadata?.paymentId;
      console.log({transactionId});


await prisma.payment.update({
  where:{id:paymentId},
  data:{
  paymentStatus: session.payment_status === 'paid' ? PaymentStatus.PAID : PaymentStatus.UNPAID,
  transactionId
  }
})

      console.log("✅ Payment successful:", transactionId);
    }

    return { received: true };
  }
export const paymentService = {
handleStripeWebhook
}