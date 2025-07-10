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

// ✅  Get All Products
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

export const fetchAllUsers = async (params) => {
  try {
    const response = await API.get(AdminEndpoints.getAllUsers, {
      params: params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllEmailTemplates = async (params) => {
  try {
    const response = await API.post(
      AdminEndpoints.getAllEmailTemplate,
      {},
      {
        params: params,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UserStatusChange = async (params) => {
  try {
    const resposnse = await API.post(
      AdminEndpoints.statusChange,
      {},
      {
        params: params,
      }
    );
    return resposnse.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProducts = async (id) => {
  try {
    const response = await API.put(`${AdminEndpoints.productDelete}/${id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
