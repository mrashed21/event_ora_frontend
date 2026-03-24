"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

import { useForgotPassword, useResetPassword } from "@/api/auth/auth.api";
import PasswordInput from "@/components/custom/password-input";
import { toast } from "sonner";

const resetSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(6, "OTP must be 6 digits"),
  new_password: z.string().min(6, "Password must be at least 6 characters"),
});

type ResetFormValues = z.infer<typeof resetSchema>;

const ResetPassword = () => {
  const [timer, setTimer] = useState(0);
  const { mutateAsync: resetPassword } = useResetPassword();

  const { mutateAsync: resendOtp } = useForgotPassword();
  const searchParams = useSearchParams();

  const rawEmail = searchParams.get("email");
  const email = rawEmail ? decodeURIComponent(rawEmail) : "";

  const [otp, setOtp] = useState("");

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: email,
      otp: "",
      new_password: "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (value: string) => {
    setOtp(value);
    setValue("otp", value, { shouldValidate: true });
  };

  const onSubmit = async (data: ResetFormValues) => {
    try {
      const res = await resetPassword(data);

      toast.success(res?.message || "Password reset successful");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to reset password");
    }
  };

  if (!email) {
    return (
      <p className="text-center mt-10 text-muted-foreground">Invalid request</p>
    );
  }

  const handle_resend_otp = async () => {
    if (timer > 0) return;

    try {
      await resendOtp({ email });
      toast.success("OTP resent successfully");

      setTimer(60);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Reset Password
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email (Read Only) */}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                {...register("email")}
                readOnly
                className="cursor-not-allowed opacity-80"
              />
            </div>

            {/* OTP */}
            <div className="space-y-2">
              <Label>OTP</Label>

              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={handleOtpChange}>
                  <InputOTPGroup>
                    {[...Array(6)].map((_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {errors.otp && (
                <p className="text-sm text-destructive text-center">
                  {errors.otp.message}
                </p>
              )}
            </div>

            {/* Password */}
            <PasswordInput
              label="New Password"
              name="new_password"
              placeholder="Enter new password"
              register={register}
              error={errors.new_password}
            />

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || otp.length < 6}
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </Button>
          </form>

          <div className="text-center text-muted-foreground">
            Don&apos;t received OTP?
            <Button
              variant="link"
              size="sm"
              type="button"
              onClick={handle_resend_otp}
              disabled={timer > 0}
              className={timer > 0 ? "opacity-60 cursor-not-allowed" : ""}
            >
              {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
