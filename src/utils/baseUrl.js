// for local

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
};

export const AdminEndpoints = {
  //  Auth APi
  login: "login",
  forgotPassword: "forgotPassword",
  resetPassword: "resetPassword",
  verifyOtp: "verifyOtp",
  // products api
  getAllproduct: "getAllproduct",
};
