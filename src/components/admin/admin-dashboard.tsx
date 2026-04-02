"use client";

import { useAdminStats } from "@/api/stats/stats.api";

import { Skeleton } from "@/components/ui/skeleton";
import {
  CalendarDays,
  DollarSign,
  MessageSquare,
  Star,
  Users,
  UserRound,
} from "lucide-react";
import StatCard from "../custom/stat-card";

const AdminDashboard = () => {
  const { data, isLoading } = useAdminStats();
  const stats = data?.data;

  if (isLoading) {
    return (
      <section className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8 p-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Overview of platform performance and activity.
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Users" value={stats?.totalUsers || 0} icon={UserRound} />
        <StatCard title="Total Events" value={stats?.totalEvents || 0} icon={CalendarDays} />
        <StatCard title="Total Reviews" value={stats?.totalReviews || 0} icon={MessageSquare} />
        <StatCard title="Average Rating" value={stats?.averageRating || 0} icon={Star} />
        <StatCard title="Total Revenue" value={`$${stats?.totalRevenue || 0}`} icon={DollarSign} />
        <StatCard title="Events This Month" value={stats?.eventThisMonth || 0} icon={CalendarDays} />
        <StatCard title="Revenue This Month" value={`$${stats?.revenueThisMonth || 0}`} icon={DollarSign} />
        <StatCard title="Participants This Month" value={stats?.participantThisMonth || 0} icon={Users} />
      </div>

      {/* Today Stats */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Today’s Activity</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard title="Today's Events" value={stats?.todaysEvents || 0} icon={CalendarDays} />
          <StatCard title="Today's Revenue" value={`$${stats?.todaysRevenue || 0}`} icon={DollarSign} />
          <StatCard title="Today's Participants" value={stats?.todaysParticipants || 0} icon={Users} />
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;