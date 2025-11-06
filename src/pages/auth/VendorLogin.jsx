import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Avatar,
  Container,
  Alert,
} from "@mui/material";
import {
  Restaurant as RestaurantIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { axiosRequest, VendorEndPoints } from "../../utils/baseUrl";

const VendorLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Replace with your actual API endpoint
      const response = await axiosRequest(
        "vendor",
        "post",
        VendorEndPoints.login,
        formData
      );

      if (response.success) {
        // Store the token and vendor info
        localStorage.setItem("vendor_token", response.data.data.token);
        localStorage.setItem(
          "vendor_info",
          JSON.stringify(response.data.data.vendor)
        );

        // Navigate to dashboard
        navigate("/vendor/dashboard");
      } else {
        setError(response.error.message || "Login failed");
      }
    } catch (error) {
      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        setError(
          error.response.data.message || "Login failed. Please try again."
        );
      } else if (error.request) {
        // Request was made but no response received
        setError("Network error. Please check your connection.");
      } else {
        // Something else happened
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Avatar
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQWFvdFOOIi82VwdSqUyGrBhoyq6aYEJ-roRSWWjiSN6bJSQFHlyDdMFmvVVWZ48CH2OmqofEtZZsFZSVxyiQF-8jAFtjDsb2BdNL-UHUH1I3o9O7PutFSFSpa1XrPk3g2qHKodo2Memogtvcwb73bRMkMfdW0zJaCN44IoxPkHiuM19hD2mIRxSKqP2gtacLVFgYtLau7bpCSp6-Q7BhFMAEAu1xAdpKspxe5ovYXDayistecu8S36Le2kvgvovEhFbnpgICR_kdq"
              sx={{
                width: 80,
                height: 80,
                mx: "auto",
                mb: 2,
              }}
            />
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Lakhdatar Restaurant
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Vendor Dashboard Login
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="email"
              autoFocus
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <Button
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{ minWidth: "auto", p: 1 }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </Button>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                borderRadius: 2,
              }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </Box>

          {/* Demo Credentials */}
          <Box sx={{ mt: 3, p: 2, bgcolor: "grey.50", borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">
              <strong>Demo Credentials:</strong>
              <br />
              Email: vendor@lakhdatar.com
              <br />
              Password: password
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default VendorLogin;
