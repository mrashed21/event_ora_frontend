import Admin from "@/components/admin/all-admin/admin";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard for managing the application",
};
const AdminPage = () => {
  return (
    <section>
      <Admin />
    </section>
  );
};

export default AdminPage;
