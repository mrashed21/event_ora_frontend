import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "../api";

type ReviewPayload = {
  eventId: string;
  rating: number;
  comment: string;
};

type UpdateReviewPayload = {
  id: string;
  eventId: string;
  rating: number;
  comment: string;
};

// CREATE REVIEW
const createReviewApi = async (payload: ReviewPayload) => {
  const { data } = await api.post("/review", payload);
  return data;
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReviewApi,
    onSuccess: (data) => {
      toast.success(data?.message || "Review submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["joined-events"] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to submit review");
    },
  });
};

// UPDATE REVIEW
const updateReviewApi = async (payload: UpdateReviewPayload) => {
  const { id, ...body } = payload;
  const { data } = await api.patch(`/review/${id}`, body);
  return data;
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReviewApi,
    onSuccess: (data) => {
      toast.success(data?.message || "Review updated successfully");
      queryClient.invalidateQueries({ queryKey: ["joined-events"] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update review");
    },
  });
};
