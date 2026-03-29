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
  event_type: "public" | "private";
  is_paid?: boolean;
  is_featured?: boolean;
  user:
    | {
        id: string;
        name: string;
        email: string;
      }
    | any;
  total_joined?: number;
  registration_fee: number | null;
  user_id: string;
  created_at: string;
  updated_at: string;
  _count?: {
    participants: number;
  };
}

//* GET Events (pagination + search_term)
const getEventsApi = async ({
  page = 1,
  limit = 10,
  search_term,
}: GetPaginationParams) => {
  const params: any = { page, limit };

  if (search_term?.trim()) {
    params.search_term = search_term;
  }

  const { data } = await api.get("/event", { params });
  return data;
};

//! GET Events hook
export const useEvents = ({
  page = 1,
  limit = 10,
  search_term,
}: GetPaginationParams) => {
  return useQuery({
    queryKey: ["events", page, limit, search_term],
    queryFn: () => getEventsApi({ page, limit, search_term }),
    // keepPreviousData: true,
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
    queryFn: () => getFeaturedEventApi(),
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
    queryFn: () => getUpComingEventApi(),
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
    queryKey: ["events", page, limit, search_term],
    queryFn: () => getEventsUserApi({ page, limit, search_term }),
    // keepPreviousData: true,
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
    queryKey: ["events", page, limit, search_term],
    queryFn: () => getEventsAdminApi({ page, limit, search_term }),
    // keepPreviousData: true,
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
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
    },
  });
};
