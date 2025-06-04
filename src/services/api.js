import axios from "axios";
import { ADMIN_BASE_URL } from "../utils/baseUrl";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: ADMIN_BASE_URL, // Replace with your actual API base URL
  timeout: 2000, // 2 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor (Attach Token)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("user"); // Get token from storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor (Handle Errors)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response.data.message);

    return Promise.reject(error);
  }
);

export default API;
