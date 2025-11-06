import React from "react";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  ReceiptLong as OrdersIcon,
  Restaurant as MenuIcon,
  Payments as EarningsIcon,
  Reviews as ReviewsIcon,
  Person as ProfileIcon,
} from "@mui/icons-material";

const BottomNavigationBar = ({ currentPage, onPageChange }) => {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        value={currentPage}
        onChange={(event, newValue) => onPageChange(newValue)}
        showLabels
      >
        <BottomNavigationAction
          label="Dashboard"
          value="dashboard"
          icon={<DashboardIcon />}
        />
        <BottomNavigationAction
          label="Orders"
          value="orders"
          icon={<OrdersIcon />}
        />
        <BottomNavigationAction label="Menu" value="menu" icon={<MenuIcon />} />
        <BottomNavigationAction
          label="Earnings"
          value="earnings"
          icon={<EarningsIcon />}
        />
        <BottomNavigationAction
          label="Reviews"
          value="reviews"
          icon={<ReviewsIcon />}
        />
        <BottomNavigationAction
          label="Profile"
          value="profile"
          icon={<ProfileIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavigationBar;
