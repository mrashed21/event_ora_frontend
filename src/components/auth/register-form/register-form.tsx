"use client";

import { RegisterFormValues, registerSchema } from "@/schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useRegister } from "@/api/auth/auth.api";
import FormInput from "@/components/custom/form-input";
import PasswordInput from "@/components/custom/password-input";
import { toast } from "sonner";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    mutateAsync: userRegister,
    isPending,
    isSuccess,
    isError,
  } = useRegister();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      user_name: "",
      user_email: "",
      user_password: "",
    },
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  // const onSubmit = (data: RegisterFormValues) => {
  //   try {
  //     userRegister(data);
  //     isSuccess && toast.success("Registration successful!");
  //     isError && toast.error("Registration failed. Please try again.");
  //   } catch (error) {
  //     console.error("Registration error:", error);
  //   }
  // };

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await userRegister(data);

      toast.success("Registration successful!");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Register
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormInput
              label="Name"
              name="user_name"
              placeholder="Enter your name"
              register={register}
              error={errors.user_name}
            />

            <FormInput
              label="Email"
              name="user_email"
              placeholder="Enter your email"
              type="email"
              register={register}
              error={errors.user_email}
            />

            <PasswordInput
              label="Password"
              name="user_password"
              placeholder="Enter your password"
              register={register}
              error={errors.user_password}
            />

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              disabled={isPending || isSubmitting}
            >
              {isPending || isSubmitting ? "Submitting..." : "Register"}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="h-px bg-border flex-1" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="h-px bg-border flex-1" />
          </div>

          {/* Google Button */}
          <Button
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={() => toast.info("Google login clicked")}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
