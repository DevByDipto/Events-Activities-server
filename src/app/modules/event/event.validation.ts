import { EventStatus, EventType } from "@prisma/client";
import z from "zod"

export const eventCreatZodSchema = z.object({
  name: z.string().min(1, "Event name is required"),

  eventType: z.nativeEnum(EventType),

  dateTime: z.string().datetime("Invalid date-time format"),
  // If frontend gives ISO string → correct

  location: z.string().min(1, "Location is required"),

  minParticipants: z.number().int().min(1, "Minimum participants must be at least 1"),

  maxParticipants: z.number().int().min(5, "Max participants must be at least 5"),

  currentParticipants: z.number().int().default(0).optional(),

  image: z.string().url("Image must be a valid URL"),

  joiningFee: z.number().int().min(0).default(0).optional(),

  status: z.nativeEnum(EventStatus).default("OPEN").optional(), 

  isFeatured: z.boolean().default(false).optional(),
});


export const eventUpdateZodSchema = z.object({

  name: z.string().min(1, "Event name is required").optional(),

  eventType: z.nativeEnum(EventType).optional(),

  dateTime: z.string().datetime("Invalid date-time format").optional(),
  // If frontend gives ISO string → correct

  location: z.string().min(1, "Location is required").optional(),

  minParticipants: z.number().int().min(1, "Minimum participants must be at least 1").optional(),

  maxParticipants: z.number().int().min(5, "Max participants must be at least 5").optional(),

  currentParticipants: z.number().int().default(0).optional(),

  image: z.string().url("Image must be a valid URL").optional(),

  joiningFee: z.number().int().min(0).default(0).optional(),

  status: z.nativeEnum(EventStatus).default("OPEN").optional(), 

  isFeatured: z.boolean().default(false).optional(),
});