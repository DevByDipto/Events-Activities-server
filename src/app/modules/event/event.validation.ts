import { EventStatus, EventType } from "@prisma/client";
import z from "zod"

export const eventZodSchema = z.object({
  name: z.string().min(1, "Event name is required"),

  eventType: z.nativeEnum(EventType),

  dateTime: z.string().datetime("Invalid date-time format"),
  // If frontend gives ISO string → correct

  location: z.string().min(1, "Location is required"),

  minParticipants: z.number().int().min(1, "Minimum participants must be at least 1"),

  maxParticipants: z.number().int().min(5, "Max participants must be at least 5"),

  currentParticipants: z.number().int().default(0),

  image: z.string().url("Image must be a valid URL"),

  joiningFee: z.number().int().min(0).default(0),

  status: z.nativeEnum(EventStatus).default("OPEN"), 

  isApproved: z.boolean().default(true),

  isFeatured: z.boolean().default(false),
});