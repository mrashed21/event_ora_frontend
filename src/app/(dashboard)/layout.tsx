"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import AppBreadcrumb from "@/components/dasboard/app-breadcrumb";
import AppSidebar from "@/components/dasboard/app-sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const role = "super_admin";

  return (
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
  );
};

export default DashboardLayout;
