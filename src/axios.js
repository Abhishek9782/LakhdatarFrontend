import axios from "axios";
import { USER_BASE_URL, ADMIN_BASE_URL, userEndPoints } from "./utils/baseUrl";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "./store/userSlice";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: USER_BASE_URL, // Ensure it's correctly set in your utils/baseUrl
  headers: { "Content-Type": "application/json" },
});

const token = window.localStorage.getItem("user");

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
    const response = await axiosInstance.get(`${USER_BASE_URL}/${url}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    // toast.error(error.response.data.message);
    throw error;
  }
};

// POST request (JSON & Multipart Support)
export const axiosPost = async (url, data, isFormData = false) => {
  try {
    const response = await axiosInstance.post(`${USER_BASE_URL}/${url}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...(isFormData && { "Content-Type": "multipart/form-data" }),
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
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

// Image Base URL for local
// export const imageUrl = "http://localhost:5000/uploads/";
// for live

export const imageUrl = "https://lakahdatarbackend.onrender.com/uploads/";
