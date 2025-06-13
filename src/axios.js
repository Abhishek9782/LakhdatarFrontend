import axios from "axios";
import { toast } from "react-toastify";

// Base URLs
import { USER_BASE_URL, ADMIN_BASE_URL } from "./utils/baseUrl";

// Create axios instance with base config
const axiosInstance = axios.create({
  baseURL: USER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Interceptor to add Authorization header dynamically
axiosInstance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("user");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Generic error handler
const handleAxiosError = (error) => {
  console.error("Axios Error:", error?.response?.data || error.message);
  return {
    success: false,
    error: error?.response?.data || "An error occurred",
  };
};

// GET request
export const axiosGet = async (url) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    // Optional: toast.error(error.response?.data?.message || "Something went wrong");
    throw error;
  }
};

// POST request (supports JSON and FormData)
export const axiosPost = async (url, data, isFormData = false) => {
  try {
    const headers = isFormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" };

    const response = await axiosInstance.post(url, data, { headers });
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
    throw error;
  }
};

// PUT request (used for update/delete actions)
export const axiosPut = async (url, data = {}) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
    throw error;
  }
};

// DELETE request (if you need a real DELETE)
export const axiosDelete = async (url) => {
  try {
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
    throw error;
  }
};

// Image Upload helper
export const axiosForImage = async (url, data) => {
  return axiosPost(url, data, true);
};

// Image base URL
export const imageUrl = "https://lakahdatarbackend.onrender.com/uploads/";
