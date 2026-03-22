import { env } from "@/utils/env";
import axios from "axios";

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(function (config: any) {
  config.withCredentials = true;
  return config;
});

export default api;
