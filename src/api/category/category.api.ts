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

export interface HomeCategoryQueryParams {
  category_status?: string;
  category_type?: "public" | "private";
  is_paid?: boolean;
  page?: number;
  limit?: number;
  search_term?: string;
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

//* GET home categories
const getHomeCategoriesApi = async (params?: HomeCategoryQueryParams) => {
  const searchParams = new URLSearchParams();

  if (params?.category_status) {
    searchParams.append("category_status", params.category_status);
  }

  if (params?.category_type) {
    searchParams.append("category_type", params.category_type);
  }

  if (params?.is_paid !== undefined) {
    searchParams.append("is_paid", String(params.is_paid));
  }

  if (params?.page) {
    searchParams.append("page", String(params.page));
  }

  if (params?.limit) {
    searchParams.append("limit", String(params.limit));
  }

  if (params?.search_term) {
    searchParams.append("search_term", params.search_term);
  }

  const queryString = searchParams.toString();

  const { data } = await api.get(
    `/category/home${queryString ? `?${queryString}` : ""}`,
  );

  return data;
};

//* GET home categories hook
export const useHomeCategories = (params?: HomeCategoryQueryParams) => {
  return useQuery({
    queryKey: ["categories-home", params],
    queryFn: () => getHomeCategoriesApi(params),
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
