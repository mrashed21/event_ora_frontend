import {
  CalendarPlus,
  LayoutDashboard,
  Package,
  Settings,
  Shield,
  User,
  Users,
} from "lucide-react";

export type UserRole = "user" | "admin" | "super_admin";

export interface SidebarItem {
  title: string;
  icon?: any;
  path?: string;
  children?: SidebarItem[];
  roles: UserRole[];
}

export const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
    roles: ["admin", "super_admin"],
  },
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/user/dashboard",
    roles: ["user"],
  },
  {
    title: "Users",
    icon: Users,
    roles: ["admin", "super_admin"],
    children: [
      {
        title: "All Users",
        path: "/dashboard/users",
        roles: ["admin", "super_admin"],
      },
      {
        title: "Add User",
        path: "/dashboard/users/create",
        roles: ["super_admin"],
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/admin/category",
    roles: ["user", "admin", "super_admin"],
  },
  {
    title: "Category",
    icon: Package,
    path: "/admin/category",
    roles: ["admin", "super_admin"],
  },
  {
    title: "Admin",
    icon: Shield,
    roles: ["super_admin"],
    children: [
      {
        title: "Manage Admin",
        path: "/admin/all-admin",
        roles: ["super_admin"],
      },
    ],
  },
  {
    title: "Profile",
    icon: User,
    path: "/dashboard/profile",
    roles: ["user", "admin", "super_admin"],
  },
  {
    title: "Event",
    icon: CalendarPlus,
    path: "/admin/event",
    roles: ["admin", "super_admin"],
  },
];
