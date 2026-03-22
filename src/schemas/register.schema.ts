import { z } from "zod";

export const registerSchema = z.object({
  user_name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters"),

  user_email: z.string().min(1, "Email is required").email("Invalid email"),

  user_password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
