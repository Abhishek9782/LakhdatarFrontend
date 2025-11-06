export const APP_CONSTANTS = {
  APP_NAME: "Lakhdatar Restaurant",
  VENDOR_NAME: "Lakhdatar",
  CURRENCY: "₹",

  // Order Status
  ORDER_STATUS: {
    PENDING: "pending",
    PREPARING: "preparing",
    COMPLETED: "completed",
    CANCELLED: "cancelled",
  },

  // Menu Categories
  MENU_CATEGORIES: [
    { id: "all", label: "All" },
    { id: "starters", label: "Starters" },
    { id: "main", label: "Main Course" },
    { id: "desserts", label: "Desserts" },
    { id: "drinks", label: "Drinks" },
  ],

  // API Endpoints
  API_ENDPOINTS: {
    LOGIN: "/api/vendor/login",
    ORDERS: "/api/orders",
    MENU: "/api/menu",
    EARNINGS: "/api/earnings",
    REVIEWS: "/api/reviews",
  },

  // Local Storage Keys
  STORAGE_KEYS: {
    VENDOR_TOKEN: "vendor_token",
    VENDOR_INFO: "vendor_info",
  },
};

export const CHART_COLORS = {
  primary: "#FF9933",
  secondary: "#138808",
  background: "rgba(255, 153, 51, 0.1)",
  grid: "rgba(0, 0, 0, 0.1)",
};

export const NAVIGATION_ITEMS = [
  { path: "/vendor/dashboard", label: "Dashboard", icon: "dashboard" },
  { path: "/vendor/orders", label: "Orders", icon: "receipt_long" },
  { path: "/vendor/menu", label: "Menu", icon: "restaurant_menu" },
  { path: "/vendor/earnings", label: "Earnings", icon: "payments" },
  { path: "/vendor/reviews", label: "Reviews", icon: "reviews" },
  { path: "/vendor/profile", label: "Profile", icon: "person" },
];
