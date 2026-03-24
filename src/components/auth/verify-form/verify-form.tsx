"use client";

import { useResendOtp, useVerify } from "@/api/auth/auth.api";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const VerifyForm = () => {
  const [timer, setTimer] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawEmail = searchParams.get("email");
  const email = rawEmail ? decodeURIComponent(rawEmail) : null;

  const [otp, setOtp] = useState("");

  const { mutateAsync: verifyUser, isPending } = useVerify();

  const { mutateAsync: resendOtp } = useResendOtp();
  const handleVerify = async () => {
    if (!otp || otp.length < 6) {
      return toast.error("Enter valid OTP");
    }

    try {
      const payload = {
        email: email as string,
        otp,
      };
      const res = await verifyUser(payload);

      toast.success(
        res?.message || "Verified successfully! You can now log in.",
      );

      router.push("/auth/login");
    } catch (error: any) {
      const message = error?.response?.data?.message || "Verification failed";
      toast.error(message);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handle_resend_otp = async () => {
    if (timer > 0) return;
    const data = {
      email: email as string,
    };
    try {
      await resendOtp(data);
      toast.success("OTP resent successfully");

      setTimer(60);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to resend OTP");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl space-y-6">
        <h2 className="text-2xl font-bold text-center">Verify Your Account</h2>

        {/* Email */}
        <p className="text-center text-sm text-muted-foreground">
          OTP sent to <span className="font-medium">{email}</span>
        </p>

        {/* OTP Input */}
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              {[...Array(6)].map((_, i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Verify Button */}
        <Button
          onClick={handleVerify}
          className="w-full"
          disabled={isPending || otp.length < 6 || !email}
        >
          {isPending ? "Verifying..." : "Verify"}
        </Button>

        {/* Resend */}
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
      </div>
    </div>
  );
};

export default VerifyForm;
