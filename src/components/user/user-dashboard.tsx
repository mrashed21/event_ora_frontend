"use client";

import { useUserStats } from "@/api/stats/stats.api";

import { Skeleton } from "@/components/ui/skeleton";
import {
  CalendarDays,
  DollarSign,
  MessageSquare,
  Star,
  Users,
  Wallet,
} from "lucide-react";
import StatCard from "../custom/stat-card";

const UserDashboard = () => {
  const { data, isLoading } = useUserStats();
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
          My Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Your review, event, and revenue summary.
        </p>
      </div>

      {/* My Review Stats */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">My Reviews</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Reviews" value={stats?.totalReviews || 0} icon={MessageSquare} />
          <StatCard title="Average Rating" value={stats?.averageRating || 0} icon={Star} />
        </div>
      </div>

      {/* My Event Stats */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">My Events</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Events" value={stats?.totalEvents || 0} icon={CalendarDays} />
          <StatCard title="Event Reviews" value={stats?.totalEventReviews || 0} icon={MessageSquare} />
          <StatCard title="Event Avg Rating" value={stats?.eventAverageRating || 0} icon={Star} />
          <StatCard title="Total Revenue" value={`$${stats?.totalRevenue || 0}`} icon={Wallet} />
        </div>
      </div>

      {/* This Month */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">This Month</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard title="Events This Month" value={stats?.eventsThisMonth || 0} icon={CalendarDays} />
          <StatCard title="Revenue This Month" value={`$${stats?.revenueThisMonth || 0}`} icon={DollarSign} />
          <StatCard title="Participants This Month" value={stats?.participantsThisMonth || 0} icon={Users} />
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;