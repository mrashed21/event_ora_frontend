import PaymentCancelPage from "@/components/payment-cancel/payment-cancel";

export const metadata = {
  title: "Payment Cancelled",
  description: "This is the payment cancelled page.",
};
const Page = () => {
  return (
    <section>
      <PaymentCancelPage />
    </section>
  );
};

export default Page;
