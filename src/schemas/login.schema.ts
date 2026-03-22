import { z } from "zod";

export const loginSchema = z.object({
  user_email: z.string().min(1, "Email is required").email("Invalid email"),

  user_password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
