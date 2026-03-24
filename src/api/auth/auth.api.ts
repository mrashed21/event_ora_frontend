import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api";

//? register user
const registerApi = async (payload: {
  user_name: string;
  user_email: string;
  user_password: string;
}) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};

//? register user hook
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

// !verify email
const verifyApi = async (payload: { email: string; otp: string }) => {
  const { data } = await api.post("/auth/verify", payload);
  return data;
};

// !verify email hook
export const useVerify = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

//? login user
const loginApi = async (payload: {
  user_email: string;
  user_password: string;
}) => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};

//? login user hook
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

//* get me
const getMeApi = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};

//* GET Categories hook
export const useGetMe = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getMeApi(),
    // keepPreviousData: true,
  });
};

// ! forgot password
const forgotPasswordApi = async (payload: { email: string }) => {
  const { data } = await api.post("/auth/forget_password", payload);
  return data;
};

// ! forgot password hook
export const useForgotPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

// ! reset password
const resetPasswordApi = async (payload: {
  email: string;
  otp: string;
  new_password: string;
}) => {
  const { data } = await api.post("/auth/reset_password", payload);
  return data;
};

// ! reset password hook
export const useResetPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
