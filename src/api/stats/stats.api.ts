import { useQuery } from "@tanstack/react-query";
import api from "../api";

// =========================
// TYPES
// =========================

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type AdminStats = {
  totalUsers: number;
  totalEvents: number;
  totalReviews: number;
  averageRating: number | string;
  totalRevenue: number;
  eventThisMonth: number;
  revenueThisMonth: number;
  participantThisMonth: number;
  todaysEvents: number;
  todaysRevenue: number;
  todaysParticipants: number;
};

export type UserStats = {
  totalReviews: number;
  averageRating: number;
  totalEvents: number;
  totalEventReviews: number;
  eventAverageRating: number;
  totalRevenue: number;
  eventsThisMonth: number;
  revenueThisMonth: number;
  participantsThisMonth: number;
};

// =========================
// QUERY KEYS
// =========================

export const statsKeys = {
  all: ["stats"] as const,
  admin: ["stats-admin"] as const,
  user: ["stats-user"] as const,
};

// =========================
// API FUNCTIONS
// =========================

const getAdminStatsApi = async (): Promise<ApiResponse<AdminStats>> => {
  const { data } = await api.get("/stats/admin");
  return data;
};

const getUserStatsApi = async (): Promise<ApiResponse<UserStats>> => {
  const { data } = await api.get("/stats/user");
  return data;
};

// =========================
// HOOKS
// =========================

export const useAdminStats = () => {
  return useQuery({
    queryKey: statsKeys.admin,
    queryFn: getAdminStatsApi,
  });
};

export const useUserStats = () => {
  return useQuery({
    queryKey: statsKeys.user,
    queryFn: getUserStatsApi,
  });
};