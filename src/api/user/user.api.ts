import { ApiResponse, GetPaginationParams } from "@/interface/meta-interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api";

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  image: string | null;
  user_role: "user" | "admin";
  user_status: "active" | "inactive";
  emailVerified: boolean;
  is_deleted: boolean;
  need_password_change: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
export type UserResponse = ApiResponse<UserInterface>;

//* GET admin users
const getUsersApi = async ({
  page = 1,
  limit = 10,
  search_term,
}: GetPaginationParams) => {
  const params: any = { page, limit };

  if (search_term?.trim()) {
    params.search_term = search_term;
  }

  const { data } = await api.get("/user", { params });
  return data;
};

export const useUsers = ({
  page = 1,
  limit = 10,
  search_term,
}: GetPaginationParams) => {
  return useQuery({
    queryKey: ["users", page, limit, search_term],
    queryFn: () => getUsersApi({ page, limit, search_term }),
  });
};

const deleteUserApi = async (id: string) => {
  const { data } = await api.delete(`/user/${id}`);
  return data;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
