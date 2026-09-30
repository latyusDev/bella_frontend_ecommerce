import axios from "axios";
import Cookies from "js-cookie";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  headers: {
    Accept: "application/json",
  },
  withCredentials: true, // needed if Laravel Sanctum uses cookie-based auth/CSRF
});

// Attach token to every outgoing request
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  // (error) => Promise.reject(error)
  (error) =>  {
    console.error("Request error:", error);
    return error
  }
);

// Handle global response errors (e.g. expired/invalid token)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("token");
      Cookies.remove("user");

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return error;
    // return Promise.reject(error);
  }
);