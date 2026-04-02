"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const exchange = async () => {
      const redirect = searchParams.get("redirect") || "/";

      try {
        const res = await fetch(
          "https://eventora-backend.up.railway.app/api/v1/auth/google/exchange",
          {
            method: "POST",
            credentials: "include",
          },
        );

        if (!res.ok) {
          router.replace("/login?error=oauth_failed");
          return;
        }

        router.replace(redirect);
      } catch (error) {
        router.replace("/login?error=oauth_failed");
      }
    };

    exchange();
  }, [router, searchParams]);

  return <div>Signing you in...</div>;
}
