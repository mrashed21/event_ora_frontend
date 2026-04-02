"use client";

import { useLogin } from "@/api/auth/auth.api";
import FormInput from "@/components/custom/form-input";
import GoogleLogin from "@/components/custom/google-login";
import PasswordInput from "@/components/custom/password-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginFormValues, loginSchema } from "@/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const LoginForm = () => {
  const router = useRouter();
  const { mutateAsync: userlogin, isPending } = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      user_email: "",
      user_password: "",
    },
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const email = watch("user_email");

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await userlogin(data);
      toast.success(res?.message || "Login successful!");
      if (
        (res?.data?.user_role === "admin" ||
          res?.data?.user_role === "super_admin") &&
        res?.data?.need_password_change
      ) {
        router.push("/auth/change-password");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      const errorCode = error?.response?.data?.error?.body?.code;

      const message =
        error?.response?.data?.message === "Email not verified"
          ? "Email not verified. Please verify your email before logging in."
          : error?.response?.data?.message || "Login failed";

      toast.error(message);

      if (error?.response?.data?.message === "Email not verified") {
        router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
        return;
      }

      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Login
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
              {isPending || isSubmitting ? "Loading..." : "Login"}
            </Button>
            <div className="text-right -my-5">
              <Link
                href={
                  email
                    ? `/auth/forgot-password?email=${encodeURIComponent(email)}`
                    : "/auth/forgot-password"
                }
              >
                <Button type="button" variant={"link"} size={"sm"}>
                  Forgot Password?
                </Button>
              </Link>
            </div>
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
            Don&apos;t have an account?{" "}
            <Link href="/auth/register">
              <Button variant={"link"} size={"sm"} type="button">
                Register
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
