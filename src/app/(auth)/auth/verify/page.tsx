import VerifyForm from "@/components/auth/verify-form/verify-form";

export const metadata = {
  title: "Verify Account",
  description: "Verify your account to access all features.",
};
const VerifyPage = () => {
  return (
    <section>
      <VerifyForm />
    </section>
  );
};

export default VerifyPage;
