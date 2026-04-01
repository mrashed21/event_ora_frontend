"use client";

import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const PaymentCancelPage = () => {
  const router = useRouter();

  return (
    <section className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 text-center shadow-sm">
        
        {/* Icon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="mt-4 text-xl font-semibold text-gray-900">
          Payment Cancelled
        </h1>

        {/* Description */}
        <p className="mt-2 text-sm text-muted-foreground">
          Your payment was cancelled before completion. No worries — you can try
          again anytime.
        </p>

        {/* Info Box */}
        <div className="mt-4 rounded-xl bg-gray-50 p-3 text-sm text-gray-600">
          <p>Transaction was not completed</p>
          <p className="text-xs text-muted-foreground">
            No payment has been charged
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-2">
          <Button
            className="w-full"
            onClick={() => router.back()}
          >
            Try Again
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PaymentCancelPage;