import { z } from "zod";

export const create_category_schema = z.object({
  category_name: z.string().trim().toLowerCase().min(2).max(100),
  category_description: z.string().trim().max(500).optional().or(z.literal("")),
  is_active: z.boolean().optional().default(true),
});

export type CreateCategoryInput = z.infer<typeof create_category_schema>;
