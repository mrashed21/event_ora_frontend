import ResetPassword from "@/components/auth/reset-password/reset-password";
import { Suspense } from "react";

export const metadata = {
  title: "Reset Password",
  description: "Reset your account password using OTP",
};
const ResetPasswordPage = () => {
  return (
    <section>
      <Suspense fallback={<p>Loading...</p>}>
      <ResetPassword />
      </Suspense>
    </section>
  );
};

export default ResetPasswordPage;
