import {
  CalendarCheck,
  CalendarDays,
  CalendarPlus,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  MailPlus,
  Package2,
  ShieldCheck,
  User,
  UserCog,
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
  //! ADMIN / SUPER ADMIN
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
    roles: ["admin", "super_admin"],
  },
  {
    title: "All Users",
    icon: Users,
    path: "/admin/users",
    roles: ["admin", "super_admin"],
  },
  {
    title: "Category",
    icon: FolderKanban,
    path: "/admin/category",
    roles: ["admin", "super_admin"],
  },
  {
    title: "All Event",
    icon: CalendarDays,
    path: "/admin/all-event",
    roles: ["admin", "super_admin"],
  },
  {
    title: "Admin",
    icon: ShieldCheck,
    roles: ["super_admin"],
    children: [
      {
        title: "Manage Admin",
        icon: UserCog,
        path: "/admin/all-admin",
        roles: ["super_admin"],
      },
    ],
  },
  {
    title: "Profile",
    icon: User,
    path: "/admin/profile",
    roles: ["admin", "super_admin"],
  },

  //! USER
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/user/dashboard",
    roles: ["user"],
  },
  {
    title: "Event",
    icon: CalendarPlus,
    path: "/user/event",
    roles: ["user"],
  },
  {
    title: "Pending Request",
    icon: ListTodo,
    path: "/user/pending-request",
    roles: ["user"],
  },
  {
    title: "Joined Events",
    icon: CalendarCheck,
    path: "/user/join-event",
    roles: ["user"],
  },
  {
    title: "Invitation Request",
    icon: Package2,
    path: "/user/invitation-request",
    roles: ["user"],
  },
  {
    title: "Send Invitation",
    icon: MailPlus,
    path: "/user/send-invitation",
    roles: ["user"],
  },
  {
    title: "Profile",
    icon: User,
    path: "/user/profile",
    roles: ["user"],
  },
];
