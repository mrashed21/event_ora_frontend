import UserDashboard from "@/components/user/user-dashboard";

export const metadata = {
  title: "User Dashboard",
  description: "View your event participation stats and reviews.",
};
const UserDashboardPage = () => {
  return <section><UserDashboard/></section>;
};

export default UserDashboardPage;
