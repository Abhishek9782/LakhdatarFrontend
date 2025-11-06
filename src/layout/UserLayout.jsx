import React from "react";
import { Box } from "@mui/material";
import { lazy } from "react";

const Navbar = lazy(() => import("../Navbars/Navbar"));
const Footer = lazy(() => import("../Footer/Footer"));

const UserLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default UserLayout;
