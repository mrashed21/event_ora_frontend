import AdminDashboard from "@/components/admin/admin-dashboard";
export const metadata = {
  title: "Admin Dashboard",
  description: "Overview of platform performance and activity.",
};
const AdminDashboardPage = () => {
  return (
    <section>
      <AdminDashboard />
    </section>
  );
};

export default AdminDashboardPage;
