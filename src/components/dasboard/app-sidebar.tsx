"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { sidebarItems, UserRole } from "./data";

const AppSidebar = ({ role }: { role: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { state, setOpen } = useSidebar();

  const filtered = sidebarItems.filter((item) =>
    item.roles.includes(role as UserRole),
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="px-2 py-4 text-center">
          <h1 className="text-lg font-bold">EventOra</h1>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {filtered.map((item) => {
                const Icon = item.icon;

                // NO CHILD → DIRECT ROUTE
                if (!item.children) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={pathname === item.path}
                        onClick={() => router.push(item.path!)}
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                // WITH CHILD → COLLAPSIBLE
                return (
                  <Collapsible
                    key={item.title}
                    defaultOpen={item.children.some(
                      (sub) => sub.path === pathname,
                    )}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          onClick={() => {
                            if (state === "collapsed") {
                              setOpen(true);
                            }
                          }}
                        >
                          {Icon && <Icon className="h-4 w-4" />}
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto h-4 w-4" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenu className="ml-4">
                          {item.children.map((sub) => {
                            const SubIcon = sub.icon;

                            return (
                              <SidebarMenuItem key={sub.title}>
                                <SidebarMenuButton
                                  isActive={pathname === sub.path}
                                  onClick={() => router.push(sub.path!)}
                                >
                                  {SubIcon && <SubIcon className="h-4 w-4" />}
                                  <span>{sub.title}</span>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            );
                          })}
                        </SidebarMenu>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
