import { Request } from "express";
import Stripe from "stripe";
import { prisma } from "../../shared/prisma";
import { PaymentStatus, User } from "@prisma/client";
import { stripe } from "../../helpers/strip";
import { GetPaymentsOptions } from "../../interfaces";

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


 const getPaymentForHost = async (user: User) => {
  const hostId = user.id;

  // Step 1: Host এর সব event খুঁজে বের করা
  const events = await prisma.event.findMany({
    where: {
      hostId: hostId
    },
    select: {
      id: true
    }
  });

  // Step 2: সেই event id গুলো বের করা
  const eventIds = events.map((event) => event.id);

  if(eventIds.length === 0) {
    return []; // host এর কোনো event নেই
  }

  // Step 3: Payment table থেকে payment খুঁজে বের করা
  const payments = await prisma.payment.findMany({
    where: {
      eventId: {
        in: eventIds
      }
    }
  });
  return payments;
};

 const getPayments = async (user: User, options?: GetPaymentsOptions) => {
  const { id, role } = user;
console.log(id, role);

  const where: any = {}; // Prisma where object

  // যদি status filter আসে
  if (options?.status) {
    where.status = options.status;
  }

  if (role === "USER") {
    // শুধুমাত্র নিজস্ব payment
    where.userId = id;
  } else if (role === "ADMIN") {
    // Admin হলে সব payment দেখাবে
    // কোন extra filter নাই, শুধু status filter apply হবে
  } else {
    throw new Error("Invalid role");
  }
console.log("where",where);

  const payments = await prisma.payment.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
  });

console.log("payments",payments);

  return payments;
};

const getSinglePayment = async (userId:string,eventId:string) => {
  const result = await prisma.payment.findUnique({where:{userId_eventId:{userId,eventId}}})
  return result
}
export const paymentService = {
handleStripeWebhook,
getPaymentForHost,
getPayments,
getSinglePayment
}