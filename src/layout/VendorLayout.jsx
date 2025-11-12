import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  Menu as MenuIcon, // This is the hamburger menu icon
  Dashboard as DashboardIcon,
  ReceiptLong as OrdersIcon,
  Restaurant as RestaurantIcon, // Renamed this one
  Payments as EarningsIcon,
  Reviews as ReviewsIcon,
  Person as ProfileIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

const VendorLayout = ({ children, title }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const user = JSON.parse(window.localStorage.getItem("vendor_info"));

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
    setTimeout(() => setIsClosing(false), 300);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/vendor/dashboard" },
    { text: "Orders", icon: <OrdersIcon />, path: "/vendor/orders" },
    { text: "Menu", icon: <RestaurantIcon />, path: "/vendor/menu" }, // Use the renamed icon here
    { text: "Earnings", icon: <EarningsIcon />, path: "/vendor/earnings" },
    { text: "Reviews", icon: <ReviewsIcon />, path: "/vendor/reviews" },
    { text: "Profile", icon: <ProfileIcon />, path: "/vendor/profile" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("vendor_token");
    localStorage.removeItem("vendor_info");
    navigate("/vendor/login");
  };

  const drawer = (
    <Box>
      {/* Drawer Header */}
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar src={user?.profileImage} sx={{ width: 40, height: 40 }} />
        <Typography variant="h6" noWrap>
          Lakhdatar
        </Typography>
      </Box>

      <Divider />

      {/* Navigation Menu */}
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            button
            onClick={() => {
              navigate(item.path);
              if (isMobile) handleDrawerClose();
            }}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                "& .MuiListItemIcon-root": {
                  color: "white",
                },
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                color:
                  location.pathname === item.path ? "white" : "text.secondary",
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 1 }} />

      {/* Logout Button */}
      <List sx={{ px: 1 }}>
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            color: "error.main",
            "&:hover": {
              backgroundColor: "error.light",
              color: "white",
            },
          }}
        >
          <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: "white",
          color: "text.primary",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon /> {/* This is the hamburger menu icon */}
          </IconButton>

          <Avatar
            src={user?.profileImage}
            sx={{ width: 40, height: 40, mr: 2, display: { md: "none" } }}
          />

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>

          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit" sx={{ ml: 1 }}>
            <Avatar src={user?.profileImage} sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "background.paper",
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "background.paper",
              borderRight: "1px solid",
              borderColor: "divider",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          backgroundColor: "background.default",
        }}
      >
        <Toolbar /> {/*This pushes content below the app bar */}
        {children}
      </Box>
    </Box>
  );
};

export default VendorLayout;
