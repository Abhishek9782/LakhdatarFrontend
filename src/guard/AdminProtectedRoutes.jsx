import React from "react";
import { Navigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";

const AdminProtectedRoute = ({ children }) => {
  const [authState, setAuthState] = React.useState({
    isAuthenticated: null,
    isLoading: true,
  });

  React.useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // For now, using simple check. Replace with actual admin auth logic
        const token = JSON.parse(localStorage.getItem("admin_token")).data;
        let decodeToken = await jwtDecode(token);

        const isAuthenticated = decodeToken.exp > Date.now() / 1000;

        setAuthState({
          isAuthenticated,
          isLoading: false,
        });
      } catch (error) {
        console.error("Admin authentication check failed:", error);
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

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
        }}
      >
        <CircularProgress size={50} />
        <Typography variant="body1" color="text.secondary">
          Checking admin authentication...
        </Typography>
      </Box>
    );
  }

  // Redirect to login if not authenticated
  if (!authState.isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  console.log(children);

  // Render children if authenticated
  return children;
};

export default AdminProtectedRoute;
