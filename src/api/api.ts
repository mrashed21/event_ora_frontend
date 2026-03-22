import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

api.interceptors.request.use(function (config: any) {
  config.withCredentials = true;
  return config;
});

export default api;
