import React from "react";
import { Route, Navigate } from "react-router-dom";
import { lazy } from "react";

// Lazy load admin components
const AdminLogin = lazy(() =>
  import("../admin/AdminPages/AdminLogin/AdminLogin")
);
const AdminHome = lazy(() => import("../admin/AdminPages/AdminHome/AdminHome"));
const AdminProducts = lazy(() =>
  import("../admin/AdminPages/AdminProducts/AdminProducts")
);
const UserList = lazy(() => import("../admin/AdminPages/AllUser/UserList"));
const AdminEmailTemplates = lazy(() =>
  import("../admin/AdminPages/AdminEmailTemplates/AdminEmailTemplates")
);
const AdminTemplateUpdate = lazy(() =>
  import("../admin/AdminPages/AdminEmailUpdate/AdminTemplateUpdate")
);

// Guards
const AdminProtectedRoute = lazy(() => import("../guard/AdminProtectedRoutes"));

const AdminRoutes = [
  // Legacy admin routes
  <Route
    key="admin-legacy-login"
    path="/lakhdatar/admin/login"
    element={<AdminLogin />}
  />,
  <Route key="admin-login" path="/admin/login" element={<AdminLogin />} />,

  <Route key="admin-redirect" path="/admin" element={<AdminLogin />} />,

  <Route
    key="admin-legacy-redirect"
    path="/lakhdatar"
    element={<AdminLogin />}
  />,

  // Protected admin routes
  <Route
    key="admin-home"
    path="/lakhdatar/admin/dashboard"
    element={
      <AdminProtectedRoute>
        {/* <AdminLayout title="Admin Dashboard"> */}
        <AdminHome />
        {/* </AdminLayout> */}
      </AdminProtectedRoute>
    }
  />,
  <Route
    key="admin-products"
    path="/lakhdatar/admin/products"
    element={
      <AdminProtectedRoute>
        {/* <AdminLayout title="Product Management"> */}
        <AdminProducts />
        {/* </AdminLayout> */}
      </AdminProtectedRoute>
    }
  />,
  <Route
    key="admin-users"
    path="/lakhdatar/admin/allusers"
    element={
      <AdminProtectedRoute>
        {/* <AdminLayout title="User Management"> */}
        <UserList />
        {/* </AdminLayout> */}
      </AdminProtectedRoute>
    }
  />,
  <Route
    key="admin-email-templates"
    path="/lakhdatar/admin/email-templates"
    element={
      <AdminProtectedRoute>
        {/* <AdminLayout title="Email Templates"> */}
        <AdminEmailTemplates />
        {/* </AdminLayout> */}
        //{" "}
      </AdminProtectedRoute>
    }
  />,
  // <Route
  //   key="admin-email-update"
  //   path="/lakhdatar/admin/email-templates/:id"
  //   element={
  //     <AdminProtectedRoute>
  //       {/* <AdminLayout title="Edit Email Template"> */}
  //       <AdminTemplateUpdate />
  //       {/* </AdminLayout> */}
  //     </AdminProtectedRoute>
  //   }
  // />,
];

export default AdminRoutes;
