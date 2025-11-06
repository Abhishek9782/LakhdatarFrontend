import React from "react";
import { decodeToken } from "react-jwt";
import { Navigate } from "react-router-dom";

const VendorProtectedRoute = ({ children }) => {
  // Check vendor authentication
  const isAuthenticated = () => {
    try {
      const token = localStorage.getItem("vendor_token");
      const vendorInfo = localStorage.getItem("vendor_info");
      let isTokenExpire = false;
      if (token) {
        let tokenDetails = decodeToken(token);
        if (tokenDetails && tokenDetails.exp) {
          const currentTime = Date.now() / 1000;
          isTokenExpire = tokenDetails.exp < currentTime;
        }
      }
      if (isTokenExpire) {
        <Navigate to="/vendor/login" />;
      }
      return !!token && !!vendorInfo;
    } catch (error) {
      console.error("Auth check error:", error);
      return false;
    }
  };

  // Redirect to login if not authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/vendor/login" replace />;
  }

  // Render children if authenticated
  return children;
};

export default VendorProtectedRoute;
