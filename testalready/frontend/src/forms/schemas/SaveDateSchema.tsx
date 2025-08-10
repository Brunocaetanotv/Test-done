import { z } from "zod";


/**
 * saveDateSchema
 *
 * Validation schema for a "Save the Date" form using Zod.
 * Validates title, summary, location, date/time
 */

/**
 * Regex to validate 24-hour time format (HH:mm)
 * Examples of valid values: "00:00", "23:59", "09:30"
 */
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;



export const saveDateSchema = z.object({
  title: z.string().min(3, "Title is required and must be at least 3 characters."),
  event_subtitle: z.string().optional(),
  event_summary: z.string().min(10, "Summary is too short (minimum 10 characters)."),
  event_times: z.array(
  z.object({
    label: z.string().min(1, "Label is required."),
    time: z.string().regex(timeRegex, "Time must be in 24-hour format (HH:mm)."),
  })
).min(1, "At least one event time is required."),
  event_venue: z.string().min(3, "Venue is required (minimum 3 characters)."),
  event_address: z.string().min(3, "Address is required (minimum 3 characters)."),
  event_city: z.string().min(2, "City is required."),
});

export type SaveDateFormValues = z.infer<typeof saveDateSchema>;
