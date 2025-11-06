import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Box,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";

const TopAppBar = ({ title }) => {
  return (
    <AppBar position="sticky" elevation={2}>
      <Toolbar>
        <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        <Avatar
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQWFvdFOOIi82VwdSqUyGrBhoyq6aYEJ-roRSWWjiSN6bJSQFHlyDdMFmvVVWZ48CH2OmqofEtZZsFZSVxyiQF-8jAFtjDsb2BdNL-UHUH1I3o9O7PutFSFSpa1XrPk3g2qHKodo2Memogtvcwb73bRMkMfdW0zJaCN44IoxPkHiuM19hD2mIRxSKqP2gtacLVFgYtLau7bpCSp6-Q7BhFMAEAu1xAdpKspxe5ovYXDayistecu8S36Le2kvgvovEhFbnpgICR_kdq"
          sx={{ width: 40, height: 40, mr: 2 }}
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
          <Avatar
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQWFvdFOOIi82VwdSqUyGrBhoyq6aYEJ-roRSWWjiSN6bJSQFHlyDdMFmvVVWZ48CH2OmqofEtZZsFZSVxyiQF-8jAFtjDsb2BdNL-UHUH1I3o9O7PutFSFSpa1XrPk3g2qHKodo2Memogtvcwb73bRMkMfdW0zJaCN44IoxPkHiuM19hD2mIRxSKqP2gtacLVFgYtLau7bpCSp6-Q7BhFMAEAu1xAdpKspxe5ovYXDayistecu8S36Le2kvgvovEhFbnpgICR_kdq"
            sx={{ width: 32, height: 32 }}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
