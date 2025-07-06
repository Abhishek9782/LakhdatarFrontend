import React from "react";
import { Nav } from "../Components/LeftSlid/Nav";
import {
  Box,
  Grid,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 10000 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 18000 },
  { month: "Apr", revenue: 12000 },
  { month: "May", revenue: 21000 },
];

const statusData = [
  { name: "Delivered", value: 60 },
  { name: "Pending", value: 25 },
  { name: "Cancelled", value: 15 },
];

const COLORS = ["#4caf50", "#ff9800", "#f44336"];

const recentOrders = [
  { id: "ORD001", user: "Abhishek", total: "\u20B91200", status: "Delivered" },
  { id: "ORD002", user: "Priya", total: "\u20B9850", status: "Pending" },
  { id: "ORD003", user: "Ravi", total: "\u20B91490", status: "Cancelled" },
];

const topProducts = [
  { name: "Paneer Tikka", sold: 120 },
  { name: "Veg Burger", sold: 95 },
  { name: "Pizza", sold: 80 },
];

const AdminHome = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Nav activeIndex={0} />
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          overflowY: "auto",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "black" }}
        >
          Welcome Admin 👋
        </Typography>

        {/* Summary Cards */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
                backgroundColor: "#1976d2",
                color: "white",
                borderRadius: 2,
              }}
            >
              <MonetizationOnIcon sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="body2">Total Revenue</Typography>
                <Typography variant="h6">₹1,20,000</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
                backgroundColor: "#2e7d32",
                color: "white",
                borderRadius: 2,
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="body2">Total Orders</Typography>
                <Typography variant="h6">1,245</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
                backgroundColor: "#6a1b9a",
                color: "white",
                borderRadius: 2,
              }}
            >
              <PeopleIcon sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="body2">Total Users</Typography>
                <Typography variant="h6">780</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Charts and Tables */}
        <Grid
          container
          spacing={3}
          mt={1}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {/* Revenue chart */}
          <Grid item xs={12} md={12} lg={12}>
            <Paper sx={{ p: 3, color: "black" }}>
              <Typography variant="h6" mb={2} sx={{ color: "black" }}>
                Monthly Revenue
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#1976d2" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Order status */}
          <Grid item xs={12} md={12} lg={12}>
            <Paper sx={{ p: 3, color: "black" }}>
              <Typography variant="h6" mb={2} sx={{ color: "black" }}>
                Order Status
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Recent Orders */}
          <Grid item xs={12} md={12}>
            <Paper sx={{ p: 3, color: "black" }}>
              <Typography variant="h6" mb={2} sx={{ color: "black" }}>
                Recent Orders
              </Typography>
              <Box component="table" width="100%" sx={{ borderSpacing: 1 }}>
                <thead>
                  <tr>
                    <th style={{ color: "black" }}>Order ID</th>
                    <th style={{ color: "black" }}>User</th>
                    <th style={{ color: "black" }}>Total</th>
                    <th style={{ color: "black" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td style={{ color: "black" }}>{order.id}</td>
                      <td style={{ color: "black" }}>{order.user}</td>
                      <td style={{ color: "black" }}>{order.total}</td>
                      <td style={{ color: "black" }}>{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Box>
            </Paper>
          </Grid>

          {/* Top Products */}
          <Grid item xs={12} md={12}>
            <Paper sx={{ p: 3, color: "black" }}>
              <Typography variant="h6" mb={2} sx={{ color: "black" }}>
                Top Selling Products
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                {topProducts.map((product, idx) => (
                  <li key={idx} style={{ color: "black" }}>
                    {product.name} —{" "}
                    <strong style={{ color: "black" }}>{product.sold}</strong>{" "}
                    sold
                  </li>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminHome;
