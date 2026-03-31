import { GetPaginationParams } from "@/interface/meta-interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api";

//! TYPES
export interface PendingParticipantsResponse {
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
    data: ParticipantInterface[];
  };
}

export interface ParticipantInterface {
  id: string;
  event_id: string;
  participant_id: string;
  participation_status:
    | "pending"
    | "approved"
    | "rejected"
    | "joined"
    | "cancelled";
  payment_status: "paid" | "not_required" | "unpaid" | "failed";
  requested_at: string;
  approved_at: string | null;
  rejected_at: string | null;
  joined_at: string | null;
  cancelled_at: string | null;
  approval_note: string | null;
  rejection_reason: string | null;
  payment_id: string | null;
  stripe_session_id: string | null;
  stripe_payment_intent: string | null;
  created_at: string;
  updated_at: string;

  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    deletedAt: string | null;
    emailVerified: boolean;
    is_deleted: boolean;
    need_password_change: boolean;
    updatedAt: string;
    image: string | null;
    user_role: "user" | "admin" | "merchant";
    user_status: "active" | "in_active";
  };

  payment: {
    id: string;
    event_id: string;
    user_id: string;
    amount: number;
    currency: string;
    payment_status: "paid" | "pending" | "failed" | "refunded";
    payment_provider: string;
    stripe_session_id: string | null;
    stripe_payment_intent: string | null;
    stripe_charge_id: string | null;
    payment_method: string | null;
    paid_at: string | null;
    refunded_at: string | null;
    refund_amount: number | null;
    metadata: any;
    created_at: string;
    updated_at: string;
  } | null;

  event: {
    id: string;
    event_title: string;
    event_image: string | null;
    event_date: string;
    event_time: string;
    event_venue: string | null;
    event_description: string | null;
    event_status: "active" | "in_active";
    is_featured: boolean;
    registration_fee: number | null;
    organizer_id: string;
    category_id: string;
    userId: string;
    created_at: string;
    updated_at: string;
  };
}

export interface PendingParticipantsQueryParams extends GetPaginationParams {
  search_term?: string;
  event_id?: string;
  payment_status?: string;
  participation_status?: string;
}

//* GET pending participants
const getPendingParticipantsApi = async (
  params?: PendingParticipantsQueryParams,
): Promise<PendingParticipantsResponse> => {
  const { data } = await api.get("/participant/pending", {
    params,
  });
  return data;
};

//* GET pending participants hook
export const usePendingParticipants = (
  params?: PendingParticipantsQueryParams,
) => {
  return useQuery({
    queryKey: ["participants-pending", params],
    queryFn: () => getPendingParticipantsApi(params),
  });
};

type UpdateReqPayload = {
  id: string;
  participant_id: string;
  replay_note: string;
  status: "approved" | "rejected";
};

// todo UPDATE request
const updateEventApi = async ({
  id,
  participant_id,
  replay_note,
  status,
}: UpdateReqPayload) => {
  const { data } = await api.patch(`/participant/pending/${id}`, {
    participant_id,
    replay_note,
    status,
  });

  return data;
};

//! UPDATE request hook
export const useUpdateRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEventApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants-pending"] });
    },
  });
};
