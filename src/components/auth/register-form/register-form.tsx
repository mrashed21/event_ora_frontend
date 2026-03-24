"use client";
import { useRegister } from "@/api/auth/auth.api";
import FormInput from "@/components/custom/form-input";
import GoogleLogin from "@/components/custom/google-login";
import PasswordInput from "@/components/custom/password-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegisterFormValues, registerSchema } from "@/schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const RegisterForm = () => {
  const router = useRouter();
  const { mutateAsync: userRegister, isPending } = useRegister();

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

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const res = await userRegister(data);

      toast.success(res?.message || "Registration successful!");
      router.push(`/auth/verify?email=${encodeURIComponent(data.user_email)}`);
    } catch (error: any) {
      const message = error?.response?.data?.message || "Registration failed";

      toast.error(message);

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
              {isPending || isSubmitting ? "Loading..." : "Register"}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="h-px bg-border flex-1" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="h-px bg-border flex-1" />
          </div>

          {/* Google Button */}
          <GoogleLogin />
          {/* Register */}
          <div className="text-center text-muted-foreground -mt-3">
            Already have an account?{" "}
            <Link href="/auth/login">
              <Button variant={"link"} size={"sm"} type="button">
                Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
