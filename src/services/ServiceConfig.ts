import axios, { AxiosError } from "axios";

export const baseUrl = import.meta.env.VITE_API_URL as string;

let isInterceptorsConfigured = false;

export const configureAxiosRequestInterceptors = () => {
  if (!isInterceptorsConfigured) {
    axios.interceptors.request.use(
      (config) => {
        const token = sessionStorage.getItem("token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        if (error.response && error.response.status === 403) {
          sessionStorage.removeItem("token");
          alert(`You don't have permission for using this app`);
          window.location.reload();
        }
        return Promise.reject(error);
      }
    );

    isInterceptorsConfigured = true;
  }
};
