import { useAuthStore, getToken } from "@/stores/auth";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});
console.log("BaseURL Axios:", import.meta.env.VITE_API_URL);

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.log("Token expired! Logging out...");
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  },
);
