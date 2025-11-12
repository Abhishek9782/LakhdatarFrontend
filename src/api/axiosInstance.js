import axios from "axios";
import { ADMIN_BASE_URL, USER_BASE_URL, VendorBaseUrl } from "../utils/baseUrl";

export const axiosRequest = async (
  type,
  method,
  endpoint,
  data = {},
  params = {},
  customHeaders = {}
) => {
  // Create axios instance
  const axiosInstance = axios.create({
    baseURL:
      type === "user"
        ? USER_BASE_URL
        : type === "vendor"
        ? VendorBaseUrl
        : ADMIN_BASE_URL,
    headers: customHeaders
      ? customHeaders
      : {
          "Content-Type": "application/json",
        },
    withCredentials: true,
  });

  // Attach Authorization token dynamically
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = JSON.parse(
        localStorage.getItem(
          type == "user"
            ? "user"
            : type == "vendor"
            ? "vendor_token"
            : "admin_token"
        )
      );
      if (token) {
        config.headers.Authorization = `Bearer ${token.data}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Make the actual request
  try {
    const response = await axiosInstance({
      method,
      url: endpoint,
      data: ["post", "put", "patch"].includes(method.toLowerCase())
        ? data
        : undefined,
      params,
      headers: customHeaders,
    });

    return { success: true, data: response.data };
  } catch (error) {
    if (error.response?.status == 401) {
      console.log(
        "we should naviagte login page and remove all user credential "
      );
    }
    return {
      success: false,
      error: error.response?.data || error.message,
      status: error.response?.status,
    };
  }
};
