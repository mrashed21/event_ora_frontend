import { ApiResponse, GetPaginationParams } from "@/interface/meta-interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api";

//! TYPES
export type CategoryResponse = ApiResponse<CategoryInterface>;

export interface CategoryInterface {
  id: string;
  category_title: string;
  category_type: "public" | "private";
  category_description: string | null;
  category_image: string | null;
  is_paid: boolean;
  category_status: "active" | "in_active";
  created_at: string;
  updated_at: string;
}

//* GET public categories
const getCategoriesApi = async () => {
  const { data } = await api.get("/category");
  return data;
};

//* GET public categories hook
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories-public"],
    queryFn: getCategoriesApi,
  });
};

//* GET admin categories
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

//* GET admin categories hook
export const useCategoriesAdmin = ({
  page = 1,
  limit = 10,
  search_term,
}: GetPaginationParams) => {
  return useQuery({
    queryKey: ["categories-admin", page, limit, search_term],
    queryFn: () => getCategoriesAdminApi({ page, limit, search_term }),
  });
};

//? create Category
const createCategoryApi = async (payload: FormData) => {
  const { data } = await api.post("/category", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

//? create Category hook
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories-admin"] });
      queryClient.invalidateQueries({ queryKey: ["categories-public"] });
    },
  });
};

//todo UPDATE Category
const updateCategoryApi = async ({
  id,
  payload,
}: {
  id: string;
  payload: FormData;
}) => {
  const { data } = await api.patch(`/category/${id}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

//todo UPDATE Category hook
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories-admin"] });
      queryClient.invalidateQueries({ queryKey: ["categories-public"] });
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
      queryClient.invalidateQueries({ queryKey: ["categories-admin"] });
      queryClient.invalidateQueries({ queryKey: ["categories-public"] });
    },
  });
};
