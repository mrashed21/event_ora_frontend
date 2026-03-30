export type CategoryType = "public" | "private";
export type FilterType =
  | "all"
  | "public_free"
  | "public_paid"
  | "private_free"
  | "private_paid";

export interface EventCategory {
  id: string;
  category_title: string;
  category_type: CategoryType;
  is_paid: boolean;
  category_image?: string | null;
  category_description?: string;
  category_status?: string;
}

export interface EventOrganizer {
  id: string;
  user_name: string;
  user_email?: string;
  profile_photo?: string | null;
}

export interface EventUser {
  id: string;
  name: string;
  email?: string;
  image?: string | null;
}

export interface EventItem {
  id: string;
  event_title: string;
  event_image?: string | null;
  event_date: string;
  event_time?: string;
  event_venue?: string;
  event_description?: string;
  event_status?: string;
  is_featured?: boolean;
  registration_fee?: number;
  organizer_id?: string;
  category_id?: string;
  userId?: string;
  created_at?: string;
  updated_at?: string;
  user?: EventUser;
  organizer?: EventOrganizer;
  category?: EventCategory;
  _count?: {
    participants?: number;
  };
}

export interface EventsResponse {
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
    data: EventItem[];
  };
}