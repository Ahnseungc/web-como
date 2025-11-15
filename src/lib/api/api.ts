import { Axios } from "axios";
import { getAccessToken } from "../cookies";

const api = new Axios({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["Content-Type"] = "application/json";

  if (process.env.NODE_ENV === "development") {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
      data: config.data,
      params: config.params,
    });
  }

  return config;
});

api.interceptors.response.use((response) => {
  if (process.env.NODE_ENV === "development") {
    console.log(
      `[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`,
      {
        status: response.status,
        data: response.data,
      }
    );
  }

  return response;
});

export default api;
