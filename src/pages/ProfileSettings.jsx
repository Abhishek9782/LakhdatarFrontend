import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

const ProfileSettings = () => {
  const vendorDetails = JSON.parse(localStorage.getItem("vendor_info"));
  return (
    <Box sx={{ p: 2 }}>
      {/* Profile Header */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Avatar
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQWFvdFOOIi82VwdSqUyGrBhoyq6aYEJ-roRSWWjiSN6bJSQFHlyDdMFmvVVWZ48CH2OmqofEtZZsFZSVxyiQF-8jAFtjDsb2BdNL-UHUH1I3o9O7PutFSFSpa1XrPk3g2qHKodo2Memogtvcwb73bRMkMfdW0zJaCN44IoxPkHiuM19hD2mIRxSKqP2gtacLVFgYtLau7bpCSp6-Q7BhFMAEAu1xAdpKspxe5ovYXDayistecu8S36Le2kvgvovEhFbnpgICR_kdq"
              sx={{ width: 80, height: 80 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight="bold">
                {vendorDetails?.restaurant?.name}
              </Typography>
              <Typography color="text.secondary">Restaurant Owner</Typography>
              <Typography variant="body2" color="text.secondary">
                Joined{" "}
                {`${new Date(vendorDetails.joined).getDate()}-${new Date(
                  vendorDetails.joined
                ).getMonth()}-${new Date(vendorDetails.joined).getFullYear()}`}
              </Typography>
            </Box>
            <Button startIcon={<EditIcon />} variant="outlined">
              Edit
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Full Name"
              defaultValue={vendorDetails.fullname}
              fullWidth
            />
            <TextField
              label="Email"
              defaultValue={vendorDetails.email}
              fullWidth
            />
            <TextField
              label="Phone Number"
              defaultValue={`+91 ${vendorDetails.mobile}`}
              fullWidth
            />
            <TextField
              label="Restaurant Address"
              multiline
              rows={3}
              defaultValue={vendorDetails.fullname}
              fullWidth
            />
          </Box>
          <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained">Save Changes</Button>
          </Box>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Notification Settings
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Order Notifications"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="New Review Alerts"
            />
            <FormControlLabel control={<Switch />} label="Marketing Emails" />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="SMS Notifications"
            />
          </Box>
        </CardContent>
      </Card>

      {/* More Settings */}
      <Card elevation={2}>
        <CardContent sx={{ p: 0 }}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Account Settings" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="Push Notifications" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <SecurityIcon />
              </ListItemIcon>
              <ListItemText primary="Privacy & Security" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Help & Support" />
            </ListItem>
            <ListItem button sx={{ color: "error.main" }}>
              <ListItemIcon sx={{ color: "error.main" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileSettings;
