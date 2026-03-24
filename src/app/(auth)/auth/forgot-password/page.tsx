import ForgotPassword from "@/components/auth/forgot-password/forgot-password";
import { Suspense } from "react";

export const metadata = {
  title: "Forgot Password",
  description: "Reset your account password",
};
const ForgotPasswordPage = () => {
  return (
    <section>
      <Suspense fallback={<p>Loading...</p>}>
        <ForgotPassword />
      </Suspense>
    </section>
  );
};

export default ForgotPasswordPage;
