"use client";

import { RegisterFormValues, registerSchema } from "@/schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

const RegisterForm = () => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      user_name: "",
      user_email: "",
      user_password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = (data: RegisterFormValues) => {
    console.log("Form Data:", data);

    toast.success("Register Successful ✅", {
      description: "Data logged in console",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Register
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div className="space-y-1">
              <Input placeholder="Enter your name" {...register("user_name")} />
              {errors.user_name && (
                <p className="text-sm text-red-500">
                  {errors.user_name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("user_email")}
              />
              {errors.user_email && (
                <p className="text-sm text-red-500">
                  {errors.user_email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("user_password")}
              />
              {errors.user_password && (
                <p className="text-sm text-red-500">
                  {errors.user_password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Register"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default RegisterForm;
