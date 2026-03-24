import VerifyForm from "@/components/auth/verify-form/verify-form";
import { Suspense } from "react";

export const metadata = {
  title: "Verify Account",
  description: "Verify your account to access all features.",
};
const VerifyPage = () => {
  return (
    <section>
      <Suspense fallback={<p>Loading...</p>}>
        <VerifyForm />
      </Suspense>
    </section>
  );
};

export default VerifyPage;
