import JoinRequest from "@/components/user/pending-request/pending-request";

export const metadata = {
  title: "Pending Request",
  description: "Manage your pending requests here.",
};

const PendingRequestPage = () => {
  return (
    <section>
      <JoinRequest />
    </section>
  );
};

export default PendingRequestPage;
