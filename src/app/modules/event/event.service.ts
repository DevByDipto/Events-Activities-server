import { Event, PaymentStatus, User } from "@prisma/client"
import { prisma } from "../../shared/prisma"
import { AppError } from "../../utils/AppError"
import httpStatus from "http-status"
import { stripe } from "../../helpers/strip"
const creatEvent = (user: User, eventData: Event) => {

    const result = prisma.event.create({
        data: { ...eventData, hostId: user.id }
    })

    return result
}

const updateEvent = (user: User, eventData: Partial<Event>, id: string) => {

    if (Object.keys(eventData).length == 0) {
        throw new AppError("you should provide at least a event field", httpStatus.BAD_REQUEST)
    }
    const result = prisma.event.update({
        where: {
            hostId: user.id,
            id,
            isApproved: true
        },
        data: eventData
    })

    return result
}

const deleteEvent = async (user: User, id: string) => {
    const result = await prisma.event.delete({ where: { hostId: user.id, id, } })
    return result
}

const getEvent = async (id: string) => {
    const result = await prisma.event.findFirstOrThrow({ where: { id, } })
    return result
}

const joinEvent = async (user: User, eventId: string) => {

    const event = await prisma.event.findUniqueOrThrow({ where: { id: eventId } })

    if (event.currentParticipants === event.maxParticipants) {
        throw new AppError("participants limite are full", httpStatus.BAD_REQUEST)
    }
    const result = await prisma.$transaction(async (tnx) => {

        const eventParticipant = await tnx.eventParticipants.create({
            data: { userId: user.id, eventId }
        })
        // console.log("eventParticipant",eventParticipant);

        const payment = await tnx.payment.create({
            data: {
                amount: event.joiningFee,
                userId: user.id,
                eventId,
            }
        })
        // console.log("payment",payment);

        await prisma.event.update({
            where: { id: event.id },
            data: { currentParticipants: (event.currentParticipants + 1) }
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            customer_email: user.email,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `${event.name} event`,
                        },
                        unit_amount: event.joiningFee * 100, // convert to cents
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                eventId: event.id,
                paymentId: payment.id,
            },
            mode: "payment",
            success_url: `https://keep.google.com/u/0/#home`,
            cancel_url: `https://facebook.com`,
        });
        // console.log("url",session.url);
        await prisma.payment.update({
            where: { id: payment.id },
            data: {
                paymentUrl: session.url
            }
        })
        return { paymentUrl: session.url };
    })



    return result
}

const cancelUnpaidevent = async () => {

    const thirtyMinAgo = new Date(Date.now() - 30 * 60 * 1000);

    const unPaidpayments = await prisma.payment.findMany({
        where: {
            createdAt: {
                lte: thirtyMinAgo
            },
            paymentStatus: PaymentStatus.UNPAID
        }
    })

    const paymentToCancel = unPaidpayments.map(payment => payment.id);

    await prisma.$transaction(async (tnx) => {
        await tnx.payment.deleteMany({
            where: {
                id: {
                    in: paymentToCancel
                }
            }
        })

        // 
        for (const unPaidpayment of unPaidpayments) {

            await tnx.eventParticipants.delete({
                where: {
                    userId_eventId: {
                        eventId: unPaidpayment.eventId,
                        userId: unPaidpayment.userId
                    }
                },
            })

            const event = await prisma.event.findUniqueOrThrow({ where: { id: unPaidpayment.eventId } })
            await tnx.event.update({
                where: {
                    id: unPaidpayment.eventId,
                },
                data: { currentParticipants: (event.currentParticipants - 1) }
            })
        }
        // 
    })

}

const getAllEvents = async (filters: any) => {
    const {
        search,
        eventType,
        location,
        featured,
        upcoming,
        past,
    } = filters;

    const where: any = {};

    // 🔍 1) Search by name
    if (search) {
        where.name = {
            contains: search,
            mode: "insensitive",
        };
    }

    // 🎯 2) Filter by eventType
    if (eventType) {
        where.eventType = eventType;
    }

    // 📍 3) Filter by location
    if (location) {
        where.location = {
            contains: location,
            mode: "insensitive",
        };
    }

    // ⭐ 4) Featured events
    if (featured === "true") {
        where.isFeatured = true;
    }

    // 📅 5) Upcoming events (date > now)
    if (upcoming === "true") {
        where.dateTime = {
            gte: new Date(),
        };
    }

    // ⏳ 6) Past events (date < now)
    if (past === "true") {
        where.dateTime = {
            lt: new Date(),
        };
    }
    // if(Object.keys(where).length === 0){
    //  const result = await prisma.event.findMany({
    //         orderBy: {
    //             dateTime: "asc",
    //         },
    //     });

    //     return result;
    // }

    const result = await prisma.event.findMany({
        where,
        orderBy: {
            dateTime: "asc",
        },
    });

    return result;

};


const getHostCreatedAllEvents = async (user: User) => {
    const result = await prisma.event.findMany({ where: { hostId: user.id, } })
    return result
}

const leaveEvent = async (user: User, eventId: string) => {

    const result = await prisma.eventParticipants.delete({
        where: {
            userId_eventId: {
                userId: user.id, eventId,
            }
        }
    })

    await prisma.payment.delete({
        where: {
            userId_eventId: {
                userId: user.id, eventId,
            }
        }
    })
    const event = await prisma.event.findUniqueOrThrow({
        where: {
            id: eventId,

        }
    })

    await prisma.event.update({
        where: { id: eventId },
        data: { currentParticipants: (event.currentParticipants - 1) }
    })


    return result
}
export const EventService = {
    creatEvent,
    updateEvent,
    deleteEvent,
    getEvent,
    joinEvent,
    cancelUnpaidevent,
    getAllEvents,
    getHostCreatedAllEvents,
    leaveEvent
}