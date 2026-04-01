"use client";

import { useGetMe } from "@/api/auth/auth.api";
import AppBreadcrumb from "@/components/dasboard/app-breadcrumb";
import AppSidebar from "@/components/dasboard/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useGetMe();
  const role = data?.data?.user_role;

  // if (isLoading || !role) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarProvider>
        <AppSidebar role={role} />

        <SidebarInset className="flex flex-col min-w-0 flex-1">
          {/* Top Bar */}
          <header className="flex h-14 shrink-0 items-center border-b px-4">
            <AppBreadcrumb />
          </header>

          {/* Page Content - only this scrolls */}
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
