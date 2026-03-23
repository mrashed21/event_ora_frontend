import z from "zod";

export const create_admin_schema = z.object({
  admin_name: z.string().min(1, "Name is required"),
  admin_email: z.string().email("Invalid email"),
  admin_password: z.string().min(6, "Minimum 6 characters"),
  admin_role: z.enum(["super_admin", "admin"]),
  profile_photo: z.any().optional(),
  contact_number: z
    .string()
    .min(11, "Minimum 11 digits")
    .max(14, "Maximum 14 digits")
    .optional()
    .or(z.literal("")),
});
