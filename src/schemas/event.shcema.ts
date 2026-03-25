import z from "zod";

export const create_event_schema = z
  .object({
    event_title: z
      .string()
      .trim()
      .min(3, "Event title must be at least 3 characters")
      .max(200, "Event title cannot exceed 200 characters"),

    event_image: z.any().optional(),

    event_date: z.string().min(1, "Event date is required"),

    event_time: z.string().min(1, "Event time is required"),

    event_venue: z
      .string()
      .trim()
      .min(3, "Event venue must be at least 3 characters")
      .max(300, "Event venue cannot exceed 300 characters"),

    event_description: z
      .string()
      .trim()
      .min(10, "Event description must be at least 10 characters")
      .max(5000, "Event description cannot exceed 5000 characters"),

    event_status: z.enum(["active", "in_active"]).optional(),

    event_type: z.enum(["public", "private"]).optional(),

    is_paid: z.boolean().optional(),

    registration_fee: z.preprocess(
      (value) => {
        if (value === "" || value === null || value === undefined) {
          return undefined;
        }
        return Number(value);
      },
      z
        .number({
          invalid_type_error: "Registration fee must be a number",
        })
        .min(0, "Registration fee cannot be negative")
        .optional(),
    ),
  })
  .superRefine((data, ctx) => {
    if (
      data.is_paid === true &&
      (data.registration_fee === undefined || data.registration_fee === null)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["registration_fee"],
        message: "Registration fee is required for paid events",
      });
    }

    if (
      data.is_paid === false &&
      data.registration_fee !== undefined &&
      data.registration_fee > 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["registration_fee"],
        message: "Registration fee should not be provided for free events",
      });
    }
  });

export type EventFormData = z.infer<typeof create_event_schema>;
