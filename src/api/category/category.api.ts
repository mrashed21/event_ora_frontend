import { ApiResponse, GetPaginationParams } from "@/interface/meta-interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api";

//! TYPES
export type CategoryResponse = ApiResponse<CategoryInterface>;

export interface CategoryInterface {
  id: string;
  category_name: string;
  category_description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

//* GET Category (pagination + search_term)
const getCategoriesApi = async ({
  page = 1,
  limit = 10,
  search_term,
}: GetPaginationParams) => {
  const params: any = { page, limit };

  if (search_term?.trim()) {
    params.search_term = search_term;
  }

  const { data } = await api.get("/category", { params });
  return data;
};

//* GET Categories hook
export const useCategories = ({
  page = 1,
  limit = 10,
  search_term,
}: GetPaginationParams) => {
  return useQuery({
    queryKey: ["categories", page, limit, search_term],
    queryFn: () => getCategoriesApi({ page, limit, search_term }),
    // keepPreviousData: true,
  });
};

//* GET Category (pagination + search_term) admin
const getCategoriesAdminApi = async ({
  page = 1,
  limit = 10,
  search_term,
}: GetPaginationParams) => {
  const params: any = { page, limit };

  if (search_term?.trim()) {
    params.search_term = search_term;
  }

  const { data } = await api.get("/category/admin", { params });
  return data;
};

//* GET Categories hook
export const useCategoriesAdmin = ({
  page = 1,
  limit = 10,
  search_term,
}: GetPaginationParams) => {
  return useQuery({
    queryKey: ["categories", page, limit, search_term],
    queryFn: () => getCategoriesAdminApi({ page, limit, search_term }),
    // keepPreviousData: true,
  });
};

//? create Category
const createCategoryApi = async (payload: {
  category_name: string;
  category_description: string | null;
}) => {
  const { data } = await api.post("/category", payload);
  return data;
};

//? create Category hook
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

// todo UPDATE Category
const updateCategoryApi = async (payload: {
  id: string;
  category_name: string;
  category_description: string | null;
  is_active: boolean;
}) => {
  const { data } = await api.patch(`/category/${payload.id}`, payload);
  return data;
};

//todo UPDATE Category hook
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

//! DELETE Category
const deleteCategoryApi = async (id: string) => {
  const { data } = await api.delete(`/category/${id}`);
  return data;
};

//! DELETE Category hook
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
