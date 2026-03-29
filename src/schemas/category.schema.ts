import { z } from "zod";

export const create_category_schema = z.object({
  category_title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100),
  category_type: z.enum(["public", "private"], {
    message: "Category type is required",
  }),
  category_description: z.string().trim().max(500).optional().or(z.literal("")),
  category_status: z.enum(["active", "in_active"]).default("active"),
  is_paid: z.boolean().default(false),
  category_image: z.any().optional(),
});

export const update_category_schema = z.object({
  id: z.string().min(1),
  category_title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100),
  category_type: z.enum(["public", "private"]),
  category_description: z.string().trim().max(500).optional().or(z.literal("")),
  category_status: z.enum(["active", "in_active"]),
  is_paid: z.boolean(),
  category_image: z.any().optional(),
});

export type CreateCategoryInput = z.infer<typeof create_category_schema>;
export type UpdateCategoryInput = z.infer<typeof update_category_schema>;
