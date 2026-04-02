import { ApiResponse, GetPaginationParams } from "@/interface/meta-interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api";

//! TYPES
export type EventResponse = ApiResponse<EventInterface>;

export interface EventInterface {
  id: string;
  event_title: string;
  event_image: string | null;
  event_date: string;
  event_time: string;
  event_venue: string;
  event_description: string;
  event_status: "active" | "in_active";
  is_featured?: boolean;
  registration_fee: number | null;
  category_id: string;
  organizer_id: string;
  userId: string | null;
  created_at: string;
  updated_at: string;
  joined_participants?: any[];

  user?: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  } | null;

  organizer?: {
    id: string;
    user_name: string;
    user_email: string;
    contact_number?: string | null;
    profile_photo?: string | null;
  } | null;

  category?: {
    id: string;
    category_title?: string;
    category_name?: string;
    category_type?: string;
    is_paid?: boolean;
    category_image?: string | null;
    category_description?: string;
    category_status?: string;
    created_at?: string;
    updated_at?: string;
  } | null;

  participants?: {
    id: string;
    participant_id: string;
    registered_at: string;
    user?: {
      id: string;
      name: string;
      email: string;
      image?: string | null;
    };
  }[];

  total_joined?: number;

  _count?: {
    participants: number;
  };
}

export type GetEventsParams = {
  page?: number;
  limit?: number;
  search_term?: string;
  category_type?: "public" | "private";
  is_paid?: boolean;
  event_status?: string;
  is_featured?: boolean;
};

//* GET Events (pagination + search_term)
//* GET Events (pagination + search + filter)
const getEventsApi = async ({
  page = 1,
  limit = 10,
  search_term,
  category_type,
  is_paid,
  event_status,
  is_featured,
}: GetEventsParams) => {
  const params: any = { page, limit };

  if (search_term?.trim()) {
    params.search_term = search_term;
  }

  if (category_type) {
    params.category_type = category_type;
  }

  if (typeof is_paid === "boolean") {
    params.is_paid = is_paid;
  }

  if (event_status) {
    params.event_status = event_status;
  }

  if (typeof is_featured === "boolean") {
    params.is_featured = is_featured;
  }

  const { data } = await api.get("/event", { params });
  return data;
};
//! GET Events hook
//! GET Events hook
export const useEvents = ({
  page = 1,
  limit = 10,
  search_term,
  category_type,
  is_paid,
  event_status,
  is_featured,
}: GetEventsParams) => {
  return useQuery({
    queryKey: [
      "events",
      page,
      limit,
      search_term,
      category_type,
      is_paid,
      event_status,
      is_featured,
    ],
    queryFn: () =>
      getEventsApi({
        page,
        limit,
        search_term,
        category_type,
        is_paid,
        event_status,
        is_featured,
      }),
  });
};

// !get Event by id
const getEventByIdApi = async (id: string) => {
  const { data } = await api.get(`/event/${id}`);
  return data;
};

//! GET Event by id hook
export const useEventById = (id: string) => {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventByIdApi(id),
    enabled: !!id,
  });
};

// !get featured Event
const getFeaturedEventApi = async () => {
  const { data } = await api.get(`/event/featured`);
  return data;
};

//! GET featured Event hook
export const useFeaturedEvent = () => {
  return useQuery({
    queryKey: ["featured-event"],
    queryFn: getFeaturedEventApi,
  });
};

// !get up-coming Event
const getUpComingEventApi = async () => {
  const { data } = await api.get(`/event/upcoming`);
  return data;
};

//! GET up-coming Event hook
export const useUpComingEvent = () => {
  return useQuery({
    queryKey: ["up-coming-event"],
    queryFn: getUpComingEventApi,
  });
};

//* GET Event (pagination + search_term) user
const getEventsUserApi = async ({
  page = 1,
  limit = 10,
  search_term,
}: GetPaginationParams) => {
  const params: any = { page, limit };

  if (search_term?.trim()) {
    params.search_term = search_term;
  }

  const { data } = await api.get("/event/user", { params });
  return data;
};

//! GET Events hook user
export const useEventsUser = ({
  page = 1,
  limit = 10,
  search_term,
}: GetPaginationParams) => {
  return useQuery({
    queryKey: ["user-events", page, limit, search_term],
    queryFn: () => getEventsUserApi({ page, limit, search_term }),
  });
};

//* GET Event (pagination + search_term) admin
const getEventsAdminApi = async ({
  page = 1,
  limit = 10,
  search_term,
}: GetPaginationParams) => {
  const params: any = { page, limit };

  if (search_term?.trim()) {
    params.search_term = search_term;
  }

  const { data } = await api.get("/event/admin", { params });
  return data;
};

//! GET Events hook admin
export const useEventsAdmin = ({
  page = 1,
  limit = 10,
  search_term,
}: GetPaginationParams) => {
  return useQuery({
    queryKey: ["admin-events", page, limit, search_term],
    queryFn: () => getEventsAdminApi({ page, limit, search_term }),
  });
};

//? create event
const createEventApi = async (formData: FormData) => {
  const { data } = await api.post("/event", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

  return data;
};

//? create Event hook
export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEventApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["user-events"] });
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      queryClient.invalidateQueries({ queryKey: ["featured-event"] });
      queryClient.invalidateQueries({ queryKey: ["up-coming-event"] });
    },
  });
};

type UpdateEventPayload = {
  id: string;
  formData: FormData;
};

// todo UPDATE Event
const updateEventApi = async ({ id, formData }: UpdateEventPayload) => {
  const { data } = await api.patch(`/event/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

//! UPDATE Event hook
export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEventApi,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["user-events"] });
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      queryClient.invalidateQueries({ queryKey: ["featured-event"] });
      queryClient.invalidateQueries({ queryKey: ["up-coming-event"] });
      queryClient.invalidateQueries({ queryKey: ["event", variables.id] });
    },
  });
};

//! DELETE Event
const deleteEventApi = async (id: string) => {
  const { data } = await api.delete(`/event/${id}`);
  return data;
};

//! DELETE Event hook
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEventApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["user-events"] });
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      queryClient.invalidateQueries({ queryKey: ["featured-event"] });
      queryClient.invalidateQueries({ queryKey: ["up-coming-event"] });
    },
  });
};

export const useSearchEvents = (searchTerm: string) => {
  return useQuery({
    queryKey: ["search-events", searchTerm],
    queryFn: async () => {
      const res = await api.get(`/event/search`, {
        params: {
          search_term: searchTerm,
        },
      });
      return res.data;
    },
    enabled: !!searchTerm,
  });
};
