import { z } from "zod";

export const create_category_schema = z.object({
  category_type: z.string().trim().toLowerCase().min(2).max(100),
  category_description: z.string().trim().max(500).optional().or(z.literal("")),
  category_status: z.enum(["active", "in_active"]).default("active"),
  is_paid: z.boolean().default(true),
});

export type CreateCategoryInput = z.infer<typeof create_category_schema>;
