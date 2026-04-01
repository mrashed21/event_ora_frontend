"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const PaymentSuccessPage = () => {
  const router = useRouter();

  return (
    <section className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 text-center shadow-sm">
        
        {/* Icon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="mt-4 text-xl font-semibold text-gray-900">
          Payment Successful 🎉
        </h1>

        {/* Description */}
        <p className="mt-2 text-sm text-muted-foreground">
          Your payment has been completed successfully. You can now access your
          event or service.
        </p>

        {/* Optional Info */}
        <div className="mt-4 rounded-xl bg-gray-50 p-3 text-sm text-gray-600">
          <p>Transaction completed</p>
          <p className="text-xs text-muted-foreground">
            Thank you for your payment
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-2">
          <Button
            className="w-full"
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccessPage;