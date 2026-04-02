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
  Star,
  StarIcon,
  StarOffIcon,
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
  //! =========================
  //! ADMIN / SUPER ADMIN
  //! =========================
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
    roles: ["admin", "super_admin"],
  },
  {
    title: "Category",
    icon: FolderKanban,
    path: "/admin/category",
    roles: ["admin", "super_admin"],
  },
  {
    title: "All Events",
    icon: CalendarDays,
    path: "/admin/all-event",
    roles: ["admin", "super_admin"],
  },
  {
    title: "All Reviews",
    icon: StarIcon,
    path: "/admin/all-reviews",
    roles: ["admin", "super_admin"],
  },
  {
    title: "User Management",
    icon: ShieldCheck,
    roles: ["super_admin"],
    children: [
      {
        title: "Admins",
        icon: UserCog,
        path: "/admin/all-admin",
        roles: ["super_admin"],
      },
      {
        title: "Users",
        icon: Users,
        path: "/admin/users",
        roles: ["admin", "super_admin"],
      },
    ],
  },
  {
    title: "Profile",
    icon: User,
    path: "/admin/profile",
    roles: ["admin", "super_admin"],
  },

  //! =========================
  //! USER (Grouped, same routes)
  //! =========================

  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/user/dashboard",
    roles: ["user"],
  },

  // 🔹 Event Management (own events)
  {
    title: "My Events",
    icon: CalendarDays,
    roles: ["user"],
    children: [
      {
        title: "Create Event",
        icon: CalendarPlus,
        path: "/user/event",
        roles: ["user"],
      },
      {
        title: "Pending Requests",
        icon: ListTodo,
        path: "/user/pending-request",
        roles: ["user"],
      },
    ],
  },

  // 🔹 Participation
  {
    title: "Participation",
    icon: CalendarCheck,
    roles: ["user"],
    children: [
      {
        title: "Joined Events",
        icon: CalendarCheck,
        path: "/user/join-event",
        roles: ["user"],
      },
    ],
  },

  // 🔹 Invitations
  {
    title: "Invitations",
    icon: MailPlus,
    roles: ["user"],
    children: [
      {
        title: "Received Invitations",
        icon: Package2,
        path: "/user/invitation-request",
        roles: ["user"],
      },
      {
        title: "Send Invitations",
        icon: MailPlus,
        path: "/user/send-invitation",
        roles: ["user"],
      },
    ],
  },

  // 🔹 Account
  {
    title: "Account",
    icon: User,
    roles: ["user"],
    children: [
      {
        title: "Profile",
        icon: User,
        path: "/user/profile",
        roles: ["user"],
      },
    ],
  },
  {
    title: "Review",
    icon: StarIcon,
    roles: ["user"],
    children: [
      {
        title: "My Reviews",
        icon: Star,
        path: "/user/reviews",
        roles: ["user"],
      },
      {
        title: "Received Reviews",
        icon: StarOffIcon,
        path: "/user/received-reviews",
        roles: ["user"],
      },
    ],
  },
];
