import ForgotPassword from "@/components/auth/forgot-password/forgot-password";

export const metadata = {
  title: "Forgot Password",
  description: "Reset your account password",
};
const ForgotPasswordPage = () => {
  return (
    <section>
      <ForgotPassword />
    </section>
  );
};

export default ForgotPasswordPage;
