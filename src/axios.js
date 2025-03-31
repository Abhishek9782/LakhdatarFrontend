import axios from "axios";
import { USER_BASE_URL } from "./utils/baseUrl";

const axiosInstance = axios.create({
  baseURL: USER_BASE_URL, // Ensure it's correctly set in your utils/baseUrl
  headers: { "Content-Type": "application/json" },
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
export const axiosGet = async (url, token) => {
  try {
    const response = await axiosInstance.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

// POST request (JSON & Multipart Support)
export const axiosPost = async (url, data, token, isFormData = false) => {
  try {
    const response = await axiosInstance.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...(isFormData && { "Content-Type": "multipart/form-data" }),
      },
    });
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

// PUT request (for Delete operations)
export const axiosDelete = async (url, token) => {
  try {
    const response = await axiosInstance.put(
      url,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.message;
  } catch (error) {
    return handleAxiosError(error);
  }
};

// Image Upload API
export const axiosForImage = async (url, data, token) => {
  return axiosPost(url, data, token, true);
};

// Image Base URL
export const imageUrl = "http://localhost:5000/uploads/";
