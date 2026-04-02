import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "../api";

// =========================
// TYPES
// =========================

export type Review = {
  id: string;
  rating: number;
  comment: string | null;
  eventId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    user_role: string;
    user_status: string;
  };
  event?: {
    id: string;
    event_title: string;
    event_image: string | null;
    event_date: string;
    event_time?: string;
    event_venue?: string;
    event_description?: string;
    event_status?: string;
    is_featured?: boolean;
    registration_fee?: number | null;
    organizer_id?: string;
    category_id?: string;
    userId?: string;
    created_at?: string;
    updated_at?: string;
  };
};

export type ReviewPayload = {
  eventId: string;
  rating: number;
  comment: string;
};

export type UpdateReviewPayload = {
  id: string;
  eventId: string;
  rating: number;
  comment: string;
};

export type DeleteReviewPayload = {
  id: string;
};

export type ReviewQueryParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
};

export type ApiSuccessResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

// =========================
// QUERY KEYS
// =========================

export const reviewKeys = {
  all: ["reviews"] as const,
  my: (params?: ReviewQueryParams) => ["my-reviews", params] as const,
  owner: (params?: ReviewQueryParams) =>
    ["owner-event-reviews", params] as const,
  admin: (params?: ReviewQueryParams) => ["admin-all-reviews", params] as const,
  event: (eventId: string) => ["event-reviews", eventId] as const,
};

// =========================
// API FUNCTIONS
// =========================

// CREATE REVIEW
const createReviewApi = async (
  payload: ReviewPayload,
): Promise<ApiSuccessResponse<Review>> => {
  const { data } = await api.post("/review", payload);
  return data;
};

// UPDATE REVIEW
const updateReviewApi = async (
  payload: UpdateReviewPayload,
): Promise<ApiSuccessResponse<Review>> => {
  const { id, ...body } = payload;
  const { data } = await api.patch(`/review/${id}`, body);
  return data;
};

// DELETE MY REVIEW
const deleteMyReviewApi = async ({
  id,
}: DeleteReviewPayload): Promise<ApiSuccessResponse<null>> => {
  const { data } = await api.delete(`/review/${id}`);
  return data;
};

// DELETE REVIEW BY ADMIN
const deleteAdminReviewApi = async ({
  id,
}: DeleteReviewPayload): Promise<ApiSuccessResponse<null>> => {
  const { data } = await api.delete(`/review/admin/${id}`);
  return data;
};

// GET MY REVIEWS
const getMyReviewsApi = async (
  params?: ReviewQueryParams,
): Promise<ApiSuccessResponse<Review[]>> => {
  const { data } = await api.get("/review/my", { params });
  return data;
};

// GET OWNER EVENT REVIEWS
const getOwnerEventReviewsApi = async (
  params?: ReviewQueryParams,
): Promise<ApiSuccessResponse<Review[]>> => {
  const { data } = await api.get("/review/owner/events", { params });
  return data;
};

// GET ADMIN ALL REVIEWS
const getAdminAllReviewsApi = async (
  params?: ReviewQueryParams,
): Promise<ApiSuccessResponse<Review[]>> => {
  const { data } = await api.get("/review/admin/all", { params });
  return data;
};

// OPTIONAL: GET REVIEWS BY EVENT
const getEventReviewsApi = async (
  eventId: string,
): Promise<ApiSuccessResponse<Review[]>> => {
  const { data } = await api.get(`/review/event/${eventId}`);
  return data;
};

// =========================
// QUERY HOOKS
// =========================

// MY REVIEWS
export const useMyReviews = (params?: ReviewQueryParams) => {
  return useQuery({
    queryKey: reviewKeys.my(params),
    queryFn: () => getMyReviewsApi(params),
  });
};

// OWNER EVENT REVIEWS
export const useOwnerEventReviews = (params?: ReviewQueryParams) => {
  return useQuery({
    queryKey: reviewKeys.owner(params),
    queryFn: () => getOwnerEventReviewsApi(params),
  });
};

// ADMIN ALL REVIEWS
export const useAdminAllReviews = (params?: ReviewQueryParams) => {
  return useQuery({
    queryKey: reviewKeys.admin(params),
    queryFn: () => getAdminAllReviewsApi(params),
  });
};

// EVENT REVIEWS
export const useEventReviews = (eventId: string) => {
  return useQuery({
    queryKey: reviewKeys.event(eventId),
    queryFn: () => getEventReviewsApi(eventId),
    enabled: !!eventId,
  });
};

// =========================
// MUTATION HOOKS
// =========================

const invalidateReviewQueries = (
  queryClient: ReturnType<typeof useQueryClient>,
) => {
  queryClient.invalidateQueries({ queryKey: ["joined-events"] });
  queryClient.invalidateQueries({ queryKey: reviewKeys.all });
  queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
  queryClient.invalidateQueries({ queryKey: ["owner-event-reviews"] });
  queryClient.invalidateQueries({ queryKey: ["admin-all-reviews"] });
  queryClient.invalidateQueries({ queryKey: ["event-reviews"] });
};

// CREATE REVIEW
export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReviewApi,
    onSuccess: (data) => {
      toast.success(data?.message || "Review submitted successfully");
      invalidateReviewQueries(queryClient);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to submit review");
    },
  });
};

// UPDATE REVIEW
export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReviewApi,
    onSuccess: (data) => {
      toast.success(data?.message || "Review updated successfully");
      invalidateReviewQueries(queryClient);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update review");
    },
  });
};

// DELETE MY REVIEW
export const useDeleteMyReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMyReviewApi,
    onSuccess: (data) => {
      toast.success(data?.message || "Review deleted successfully");
      invalidateReviewQueries(queryClient);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete review");
    },
  });
};

// DELETE REVIEW BY ADMIN
export const useDeleteAdminReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAdminReviewApi,
    onSuccess: (data) => {
      toast.success(data?.message || "Review deleted successfully");
      invalidateReviewQueries(queryClient);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete review");
    },
  });
};
