"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useForgotPassword } from "@/api/auth/auth.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const forgotSchema = z.object({
  email: z.string().email("Valid email required"),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

const ForgotPassword = () => {
  const { mutateAsync: forgotPassword } = useForgotPassword();
  const searchParams = useSearchParams();

  const rawEmail = searchParams.get("email");
  const email = rawEmail ? decodeURIComponent(rawEmail) : "";
  const router = useRouter();

  const form = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: email || "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: ForgotFormValues) => {
    try {
      const res = await forgotPassword(data);
      toast.success(res?.message || "OTP sent to your email");
      router.push(
        `/auth/reset-password?email=${encodeURIComponent(data.email)}`,
      );
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Forgot Password
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                defaultValue={email}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send OTP"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
