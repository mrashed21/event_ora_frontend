import AuthCallbackClient from "@/components/auth/call-back";
import { Suspense } from "react";

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div>Signing you in...</div>}>
      <AuthCallbackClient />
    </Suspense>
  );
}
