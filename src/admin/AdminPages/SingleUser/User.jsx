import React, { useCallback, useState } from "react";
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
import { green, red, orange } from "@mui/material/colors";
import { toast } from "react-hot-toast";
import {
  AdminEndpoints,
  axiosRequest,
  userEndPoints,
} from "../../../utils/baseUrl";
import { UserStatusChange } from "../../../services/authService";

const statusColors = {
  Active: green[500],
  Deactivated: orange[500],
  Delete: red[500],
};

const UserCard = ({ user, setOpenUserDetails }) => {
  const [status, setStatus] = useState(user.status);

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    let status = newStatus == "Active" ? 1 : newStatus == "Deactivate" ? 0 : 2;
    setStatus(status);
  };

  // here we update using api

  const handleSubmit = async () => {
    let params = { id: user._id, status: status };

    const res = await UserStatusChange(params);

    if (res.status) {
      toast.success(res?.message);
      setOpenUserDetails(false);
    }
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
                status == 1 ? "Active" : status == 0 ? "Deactivate" : "Delete"
              }
              sx={{
                backgroundColor:
                  statusColors[
                    status == 1
                      ? "Active"
                      : status == 0
                      ? "Deactivated"
                      : "Delete"
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
                  status == 1 ? "Active" : status == 0 ? "Deactivate" : "Delete"
                }
                label="Status"
                sx={{ color: "black" }}
                onChange={handleStatusChange}
              >
                <MenuItem value="Active" sx={{ color: "black" }}>
                  Active
                </MenuItem>

                <MenuItem value="Deactivate" sx={{ color: "black" }}>
                  Deactivate
                </MenuItem>
                <MenuItem value="Delete" sx={{ color: "black" }}>
                  Delete
                </MenuItem>
              </Select>
            </FormControl>
            {/* Submit Button */}

            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleSubmit}
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
