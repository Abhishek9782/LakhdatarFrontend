import API from "./api";
import { AdminEndpoints } from "../utils/baseUrl";

// ✅ Admin Login
export const loginAdmin = async (data) => {
  try {
    const response = await API.post(`/access/${AdminEndpoints.login}`, data);
    return response.data;
  } catch (error) {
    console.error("Admin Login Error:", error.response?.data || error.message);
    throw error; // Ensure the calling function knows about the error
  }
};

// ✅ Update User Profile
export const getProducts = async (userData) => {
  try {
    const response = await API.post(
      `/product/${AdminEndpoints.getAllproduct}`,
      userData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
