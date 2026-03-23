import api from "@/api/api";
import { ApiResponse, GetPaginationParams } from "@/interface/meta-interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//! TYPES
export type AdminResponse = ApiResponse<AdminInterface>;

export interface AdminInterface {
  id: string;
  admin_name: string;
  admin_email: string;
  profile_photo: string | null;
  contact_number: string | null;
  admin_role: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user_id: string;
  is_active: boolean;
}

//* GET admin (pagination + search_term) admin

const getAdminApi = async ({
  page = 1,
  limit = 10,
  search_term,
}: GetPaginationParams) => {
  const params: any = { page, limit };

  if (search_term?.trim()) {
    params.search_term = search_term;
  }

  const { data } = await api.get("/admin", { params });
  return data;
};

//* GET Admins hook
export const useAdmins = ({
  page = 1,
  limit = 10,
  search_term,
}: GetPaginationParams) => {
  return useQuery({
    queryKey: ["admins", page, limit, search_term],
    queryFn: () => getAdminApi({ page, limit, search_term }),
    // keepPreviousData: true,
  });
};

//? create admin
const createAdminApi = async (payload: {
  admin_name: string;
  admin_email: string;
  profile_photo: string | null;
  contact_number: string | null;
  admin_role: string;
}) => {
  const { data } = await api.post("/admin", payload);
  return data;
};

//? create Admin hook
export const useCreateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAdminApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
  });
};

// todo UPDATE Admin
const updateAdminApi = async ({
  payload,
}: {
  payload: {
    id: string;
    admin_name: string;
    admin_email: string;
    profile_photo: string | null;
    contact_number: string | null;
    admin_role: string;
    is_deleted: boolean;
    is_active: boolean;
  };
}) => {
  const { data } = await api.patch(`/admin/${payload.id}`, payload);
  return data;
};

//todo UPDATE Admin hook
export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAdminApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
  });
};

//! DELETE Admin
const deleteAdminApi = async (id: string) => {
  const { data } = await api.put(`/admin/${id}`);
  return data;
};

//! DELETE Admin hook
export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAdminApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
  });
};
