import PaymentSuccessPage from "@/components/payment-success/payment-success";

export const metadata = {
  title: "Payment Success",
  description: "This is the payment success page.",
};

const Page = () => {
  return (
    <section>
      <PaymentSuccessPage />
    </section>
  );
};

export default Page;
