import React from "react";
import { Route } from "react-router-dom";
import { lazy } from "react";

// Lazy load user components
const Login = lazy(() => import("../Login/Login"));
const Register = lazy(() => import("../Register/Register"));
const Cart = lazy(() => import("../Cart/Cart"));
const Orders = lazy(() => import("../Orders/Orders"));
const UserLayout = lazy(() => import("../layout/UserLayout"));

// Guards
const ProtectedRoute = lazy(() => import("../guard/UserProtectedRoutes"));

const UserRoutes = [
  <Route key="user-login" path="/user-login" element={<Login />} />,
  <Route key="user-register" path="/user-register" element={<Register />} />,
  <Route
    key="cart"
    path="/cart"
    element={
      <ProtectedRoute>
        <UserLayout>
          <Cart />
        </UserLayout>
      </ProtectedRoute>
    }
  />,
  <Route
    key="orders"
    path="/orders"
    element={
      <ProtectedRoute>
        <UserLayout>
          <Orders />
        </UserLayout>
      </ProtectedRoute>
    }
  />,
  // <Route
  //   key="profile"
  //   path="/profile"
  //   element={
  //     <ProtectedRoute>
  //       <UserProfile />
  //     </ProtectedRoute>
  //   }
  // />,
];

export default UserRoutes;
