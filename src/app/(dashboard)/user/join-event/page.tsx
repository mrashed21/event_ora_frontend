import JoinEvent from "@/components/user/join-request/join-event";

export const metadata = {
  title: "Join Request",
  description: "Manage your join requests and view their status in one place.",
};
const JoinEeventPage = () => {
  return (
    <section>
      <JoinEvent />
    </section>
  );
};

export default JoinEeventPage;
