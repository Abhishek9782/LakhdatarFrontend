import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
  Chip,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { green, red, orange, grey } from "@mui/material/colors";

const statusColors = {
  Active: green[500],
  Blocked: red[500],
  Deactivated: orange[500],
  Deleted: grey[500],
};

const UserCard = ({ user, setOpenUserDetails }) => {
  const [status, setStatus] = useState(user.status);

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    console.log("Status changed to:", newStatus);
    // Trigger API call if needed
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: "80%",
          height: "90%",
          overflowY: "auto",
          p: 3,
          position: "relative",
          boxShadow: 6,
          borderRadius: 4,
          backgroundColor: "#fff",
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={() => setOpenUserDetails(false)}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            backgroundColor: "#999",
            "&:hover": { backgroundColor: "#ddd" },
          }}
        >
          <CloseIcon />
        </IconButton>

        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar src={user.img} sx={{ width: 60, height: 60, mr: 2 }} />
            <Box>
              <Typography variant="h5" color="text.secondary">
                {user.fullname}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 4,
            }}
          >
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Phone: {user.mobile}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Role: {user.role}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Account Create on : {new Date(user.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Account update on: {new Date(user.updatedAt).toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" gutterBottom>
              Current Status:
            </Typography>

            <Chip
              label={
                status == 1 ? "Active" : status == 0 ? "Deactivated" : "Deleted"
              }
              sx={{
                backgroundColor:
                  statusColors[
                    status == 1
                      ? "Active"
                      : status == 0
                      ? "Deactivated"
                      : "Deleted"
                  ],
                color: "white",
                fontWeight: 500,
                mb: 1,
              }}
            />

            <FormControl fullWidth size="small" sx={{ mt: 1 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={
                  status == 1
                    ? "Active"
                    : status == 0
                    ? "Deactivated"
                    : "Deleted"
                }
                label="Status"
                onChange={handleStatusChange}
              >
                <MenuItem value="Active" sx={{ color: "black" }}>
                  Actives
                </MenuItem>
                <MenuItem value="Blocked" sx={{ color: "black" }}>
                  Blocked
                </MenuItem>
                <MenuItem value="Deactivated" sx={{ color: "black" }}>
                  Deactivated
                </MenuItem>
                <MenuItem value="Deleted" sx={{ color: "black" }}>
                  Deleted
                </MenuItem>
              </Select>
            </FormControl>
            {/* Submit Button */}

            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              //   onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserCard;
