"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { useGetMe } from "@/api/auth/auth.api";
import AppBreadcrumb from "@/components/dasboard/app-breadcrumb";
import AppSidebar from "@/components/dasboard/app-sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useGetMe();

  const role = data?.data?.user_role;

  if (isLoading || !role) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main className="overflow-hidden">
      <SidebarProvider>
        <AppSidebar role={role} />

        <SidebarInset>
          {/* Top Bar */}
          <header className="flex h-14 items-center border-b px-4">
            <AppBreadcrumb />
          </header>

          {/* Page Content */}
          <main className="p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
};

export default DashboardLayout;
