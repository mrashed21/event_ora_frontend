import User from "@/components/admin/user/user";

export const metadata = {
  title: "User All",
  description: "This is the user page.",
};
const UserPage = () => {
  return (
    <section>
      <User />
    </section>
  );
};

export default UserPage;
