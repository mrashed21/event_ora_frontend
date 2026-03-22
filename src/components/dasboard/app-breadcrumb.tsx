"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const AppBreadcrumb = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="flex items-center gap-3">
      {/* Sidebar Toggle Button */}
      <SidebarTrigger />

      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          {segments.map((seg, i) => (
            <div key={i} className="flex items-center gap-2">
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={"/" + segments.slice(0, i + 1).join("/")}
                  className="capitalize"
                >
                  {seg.replace("-", " ")}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {i < segments.length - 1 && <BreadcrumbSeparator />}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default AppBreadcrumb;
