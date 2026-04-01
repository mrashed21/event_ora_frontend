import MyInvitationsPage from "@/components/user/invitation-request/invitation";

export const metadata = {
  title: "Invitation Request",
  description: "This is the invitation request page.",
};

const InvaitationPage = () => {
  return (
    <section>
      <MyInvitationsPage />
    </section>
  );
};

export default InvaitationPage;
