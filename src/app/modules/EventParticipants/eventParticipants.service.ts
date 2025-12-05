import { Event } from "@prisma/client";
import { prisma } from "../../shared/prisma";




 const getAllEventParticipants= async (user: any) => {
// console.log(user,"user");

    // ADMIN → returns all
    if (user.role === "ADMIN") {
        console.log("work");
        const eventParticipants = await prisma.eventParticipants.findMany()
        console.log("eventParticipants",eventParticipants);
        
        return eventParticipants
      return await prisma.eventParticipants.findMany({
        include: {
          user: true,
          event: true,
        }
      });
    }

    // USER → only his participants
    if (user.role === "USER") {
      
      const result = await prisma.eventParticipants.findMany({
        where: { userId: user.id },
        include: {
          user: true,
          event: true,
        }
      });
      console.log("result",result);
      
      return result
    }

    // HOST → all participants of events created by the HOST
    if (user.role === "HOST") {

      // Step 1: get host’s event IDs
      const hostEvents = await prisma.event.findMany({
        where: { hostId: user.id },
        select: { id: true }
      });
console.log("hostEvents",hostEvents);

      const eventIds = hostEvents.map((ev :any) => ev.id);
console.log("eventIds",eventIds);

      // Step 2: get all EventParticipants for those events
       const result = await prisma.eventParticipants.findMany({
        where: { eventId: { in: eventIds } },
        include: {
          user: true,
          event: true,
        }
      });
      console.log("result",result);
      
      return result
    }

    
  }



export const EventParticipantsService = {
    getAllEventParticipants
}