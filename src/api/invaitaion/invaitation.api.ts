import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api";

// =========================
// Types
// =========================
export interface InvitationUser {
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
  user_role: string;
  user_status: string;
}

export interface InvitationCategory {
  id: string;
  category_description: string;
  created_at: string;
  updated_at: string;
  category_status: string;
  is_paid: boolean;
  category_image: string;
  category_title: string;
  category_type: string;
}

export interface InvitationOrganizer {
  id: string;
  user_id: string;
  contact_number: string | null;
  created_at: string;
  deleted_at: string | null;
  is_deleted: boolean;
  profile_photo: string | null;
  updated_at: string;
  user_address: string | null;
  user_email: string;
  user_name: string;
}

export interface InvitationEvent {
  id: string;
  event_title: string;
  event_image: string;
  event_date: string;
  event_time: string;
  event_venue: string;
  event_description: string;
  event_status: string;
  is_featured: boolean;
  registration_fee: number | null;
  organizer_id: string;
  category_id: string;
  userId: string;
  created_at: string;
  updated_at: string;
  category: InvitationCategory;
  organizer: InvitationOrganizer;
}

export interface SentInvitation {
  id: string;
  email: string;
  event_id: string;
  status: "pending" | "accepted" | "rejected";
  created_at: string;
  updated_at: string;
  user_id: string;
  invited_by: string;
  responded_at: string | null;
  event: InvitationEvent;
  user: InvitationUser;
}

export interface SentInvitationsResponse {
  success: boolean;
  message: string;
  data: SentInvitation[];
}

// =========================
// GET Sent Invitations API
// =========================
export const getSentInvitationsApi =
  async (): Promise<SentInvitationsResponse> => {
    const { data } = await api.get("/invitation/sent");
    return data;
  };

// =========================
// GET Sent Invitations Hook
// =========================
export const useSentInvitations = () => {
  return useQuery({
    queryKey: ["invitations", "sent"],
    queryFn: getSentInvitationsApi,
  });
};

// =========================
// CREATE Invitation API
// =========================
export const createInvitationApi = async (payload: {
  user_id: string;
  event_id: string;
  email: string | undefined;
}) => {
  const { data } = await api.post("/invitation", payload);
  return data;
};

// =========================
// CREATE Invitation Hook
// =========================
export const useCreateInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInvitationApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
      queryClient.invalidateQueries({ queryKey: ["invitations", "sent"] });
    },
  });
};
