"use client";

import { useVerify } from "@/api/auth/auth.api";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const VerifyForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawEmail = searchParams.get("email");
  const email = rawEmail ? decodeURIComponent(rawEmail) : null;

  const [otp, setOtp] = useState("");

  const { mutateAsync: verifyUser, isPending } = useVerify();

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

      console.log("res: ", res);
      toast.success(
        res?.message || "Verified successfully! You can now log in.",
      );

      router.push("/auth/login");
    } catch (error: any) {
      const message = error?.response?.data?.message || "Verification failed";
      toast.error(message);
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

        {/* Resend (UI only এখন) */}
        <p className="text-center text-sm text-muted-foreground">
          Didn’t receive code?{" "}
          <span className="text-emerald-500 cursor-pointer hover:underline">
            Resend
          </span>
        </p>
      </div>
    </div>
  );
};

export default VerifyForm;
