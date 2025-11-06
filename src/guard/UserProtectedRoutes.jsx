import React from "react";
import { Navigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const [authState, setAuthState] = React.useState({
    isAuthenticated: null,
    isLoading: true,
  });

  React.useEffect(() => {
    const checkAuthentication = () => {
      try {
        // Check if user is authenticated
        // You can modify this logic based on your authentication system
        const userToken = JSON.parse(localStorage.getItem("user")).data;
        const userInfo = localStorage.getItem("user_info");

        // For demo purposes, consider authenticated if token exists
        // In real app, you might want to verify the token with your backend
        const decodeToken = jwtDecode(userToken);
        const isAuthenticated = decodeToken.exp > Date.now() / 1000;
        console.log(isAuthenticated);

        setAuthState({
          isAuthenticated,
          isLoading: false,
        });
      } catch (error) {
        console.error("User authentication check failed:", error);
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    // Check authentication immediately
    checkAuthentication();
  }, []);

  // Show loading while checking authentication
  if (authState.isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "background.default",
        }}
      >
        <CircularProgress size={50} sx={{ color: "primary.main" }} />
        <Typography variant="body1" color="text.secondary">
          Checking authentication...
        </Typography>
      </Box>
    );
  }

  // Redirect to login if not authenticated
  if (!authState.isAuthenticated) {
    console.log("User not authenticated, redirecting to login...");
    return <Navigate to="/user-login" replace />;
  }

  console.log("User authenticated, rendering protected content...");

  // Render children if authenticated
  return children;
};

export default ProtectedRoute;
