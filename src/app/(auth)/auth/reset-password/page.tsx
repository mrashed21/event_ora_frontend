import ResetPassword from "@/components/auth/reset-password/reset-password";

export const metadata = {
  title: "Reset Password",
  description: "Reset your account password using OTP",
};
const ResetPasswordPage = () => {
  return (
    <section>
      <ResetPassword />
    </section>
  );
};

export default ResetPasswordPage;
