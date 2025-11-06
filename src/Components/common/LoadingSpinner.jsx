import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingSpinner = ({
  size = 40,
  message = "Loading...",
  fullScreen = false,
}) => {
  const containerStyles = fullScreen
    ? {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: 2,
      }
    : {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        gap: 2,
      };

  return (
    <Box sx={containerStyles}>
      <CircularProgress size={size} sx={{ color: "primary.main" }} />
      {message && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner;
