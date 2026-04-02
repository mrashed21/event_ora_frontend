"use client";

import { Button } from "@/components/ui/button";

const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    window.location.href = `/api/v1/auth/login/google?redirect=/`;
  };

  return (
    <section>
      <Button
        variant="outline"
        className="w-full flex items-center gap-2"
        onClick={handleGoogleLogin}
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="google"
          className="w-5 h-5"
        />
        Continue with Google
      </Button>
    </section>
  );
};

export default GoogleLogin;
