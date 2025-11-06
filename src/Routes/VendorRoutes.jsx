import React from "react";
import { Route, Navigate } from "react-router-dom";
import { lazy } from "react";

// Lazy load vendor components
const VendorLogin = lazy(() => import("../pages/auth/VendorLogin"));
const VendorDashboard = lazy(() => import("../pages/Dashboard"));
const VendorOrders = lazy(() => import("../pages/OrderManagement"));
const VendorMenu = lazy(() => import("../pages/MenuManagement"));
const VendorEarnings = lazy(() => import("../pages/Earnings"));
const VendorReviews = lazy(() => import("../pages/Reviews"));
const VendorProfile = lazy(() => import("../pages/ProfileSettings"));
const VendorLayout = lazy(() => import("../layout/VendorLayout"));

// Guards
const VendorProtectedRoute = lazy(() =>
  import("../guard/VendorProtectedRoute")
);

const VendorRoutes = [
  <Route key="vendor-login" path="/vendor/login" element={<VendorLogin />} />,
  <Route
    key="vendor-redirect"
    path="/vendor"
    element={<Navigate to="/vendor/login" replace />}
  />,

  <Route
    key="vendor-dashboard"
    path="/vendor/dashboard"
    element={
      <VendorProtectedRoute>
        <VendorLayout title="Dashboard">
          <VendorDashboard />
        </VendorLayout>
      </VendorProtectedRoute>
    }
  />,
  <Route
    key="vendor-orders"
    path="/vendor/orders"
    element={
      <VendorProtectedRoute>
        <VendorLayout title="Order Management">
          <VendorOrders />
        </VendorLayout>
      </VendorProtectedRoute>
    }
  />,
  <Route
    key="vendor-menu"
    path="/vendor/menu"
    element={
      <VendorProtectedRoute>
        <VendorLayout title="Menu Management">
          <VendorMenu />
        </VendorLayout>
      </VendorProtectedRoute>
    }
  />,
  <Route
    key="vendor-earnings"
    path="/vendor/earnings"
    element={
      <VendorProtectedRoute>
        <VendorLayout title="Earnings & Payments">
          <VendorEarnings />
        </VendorLayout>
      </VendorProtectedRoute>
    }
  />,
  <Route
    key="vendor-reviews"
    path="/vendor/reviews"
    element={
      <VendorProtectedRoute>
        <VendorLayout title="Customer Reviews">
          <VendorReviews />
        </VendorLayout>
      </VendorProtectedRoute>
    }
  />,
  <Route
    key="vendor-profile"
    path="/vendor/profile"
    element={
      <VendorProtectedRoute>
        <VendorLayout title="Profile Settings">
          <VendorProfile />
        </VendorLayout>
      </VendorProtectedRoute>
    }
  />,
];

export default VendorRoutes;
