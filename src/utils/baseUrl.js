import axios from "axios";
// export const USER_BASE_URL = "http://localhost:5000";
// export const ADMIN_BASE_URL = "http://localhost:5000/lakhdatar/admin";

// for live url
export const USER_BASE_URL = "https://lakahdatarbackend.onrender.com";
export const ADMIN_BASE_URL =
  "https://lakahdatarbackend.onrender.com/lakhdatar/admin";

export const userEndPoints = {
  login: "user-login",
  register: "user-register",
  verifyOtp: "verifyOtp",
  resendOtp: "resendOtp/",
  changePassword: "chnagePassword",
  forgotPassword: "forgotPassword",
  addtoCart: "addToCart",
  allCarts: "getAllCarts",
  cartDecreaseQty: "cartDecreaseQty",
  cartIncreaseQty: "cartIncreaseQty",
  getProfile: "getProfile",
  getallmenuProduct: "/food",
  getfoodBytype: "/food/type",
  createPaymetOrder: "api/create-payment-order",
  verifyPayment: "api/verify-payment",
  saveOrder: "save-order",
  getAllorder: "/orders",
  FeatureProducts: "/food/featureProducts",
};

export const AdminEndpoints = {
  //  Auth APi
  login: "login",
  forgotPassword: "forgotPassword",
  resetPassword: "resetPassword",
  verifyOtp: "verifyOtp",
  // products api
  getAllproduct: "getAllproduct",
  statusChange: "changeuserStatus",
  getAllEmailTemplate: "email-templates/getAllEmailTemplate",
  getAllUsers: "/allusers",
  addProduct: "/product/productadd",
  productDelete: "/product/deleteproduct",
};

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
    baseURL: type === "user" ? USER_BASE_URL : ADMIN_BASE_URL,
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
      const token = JSON.parse(localStorage.getItem("user"));
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
    if (error.response.statu == 401) {
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
