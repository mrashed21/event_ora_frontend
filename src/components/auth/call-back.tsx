"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const AuthCallbackClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const exchange = async () => {
      const redirect = searchParams.get("redirect") || "/";

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google/exchange`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (!res.ok) {
          router.replace("/login?error=no_session_found");
          return;
        }

        router.replace(redirect);
      } catch (error) {
        router.replace("/login?error=oauth_failed");
      }
    };

    exchange();
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-sm text-muted-foreground">Signing you in...</p>
    </div>
  );
};

export default AuthCallbackClient;