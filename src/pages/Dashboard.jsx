import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
} from "@mui/material";
import {
  ShoppingBag as OrdersIcon,
  CurrencyRupee as EarningsIcon,
  Restaurant as DishesIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  Add as AddIcon,
  ListAlt as ListIcon,
} from "@mui/icons-material";
import { getDashBoard, getrecentOrders } from "../api/vendorApi";
import { useEffect } from "react";
import { useState } from "react";

const Dashboard = () => {
  const [dashboardInfo, setDashboardInfo] = useState({});
  const [getOrder, setRecentOrders] = useState([]);
  const [viewAllbtn, setViewAllBtn] = useState(false);

  const fetchData = async () => {
    // const data = await getDashBoard();
    // const fetc = await getrecentOrders();
    const [data, orders] = await Promise.all([
      getDashBoard(),
      getrecentOrders(),
    ]);

    // set dahboard info in state
    setDashboardInfo(data[0]);
    setRecentOrders(orders);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = [
    {
      label: "Total Orders",
      value: dashboardInfo.totalOrders || 0,
      icon: <OrdersIcon />,
      color: "primary",
    },
    {
      label: "Earnings",
      value: Number.parseInt(dashboardInfo?.totalSales) || 0,
      icon: <EarningsIcon />,
      color: "secondary",
    },
    {
      label: "Active Dishes",
      value: dashboardInfo?.productData?.totalActiveProducts || 0,
      icon: <DishesIcon />,
      color: "success",
    },
    {
      label: "Avg. Rating",
      value: dashboardInfo?.averageRating || 4.5,
      icon: <StarIcon />,
      color: "warning",
    },
  ];

  let Initial_count = 3;
  const recentOrders = getOrder.slice(
    0,
    viewAllbtn ? getOrder.length : Initial_count
  );

  return (
    <Box sx={{ p: 2 }}>
      {/* Stats Grid */}
      <Grid container spacing={6} sx={{ mb: 3 }}>
        {stats.map((stat, index) => (
          <Grid item xs={6} key={index}>
            <Card elevation={2}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Box sx={{ padding: "15px " }}>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: `${stat.color}.light`,
                      borderRadius: 1,
                      p: 1,
                      color: `${stat.color}.main`,
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Sales Overview */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Sales Overview
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="h4" fontWeight="bold" sx={{ mr: 2 }}>
              ₹8,500
            </Typography>
            <Chip
              icon={<TrendingUpIcon />}
              label="+5.2%"
              color="success"
              size="small"
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Daily Sales • Today
          </Typography>
          {/* Chart placeholder */}
          <Box
            sx={{
              height: 150,
              background:
                "linear-gradient(180deg, #FF993320 0%, #FF993300 100%)",
              mt: 2,
              borderRadius: 1,
            }}
          />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            fullWidth
            sx={{ py: 1.5 }}
          >
            Add New Dish
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            startIcon={<ListIcon />}
            fullWidth
            sx={{ py: 1.5 }}
          >
            View Orders
          </Button>
        </Grid>
      </Grid>

      {/* Recent Orders */}
      <Card elevation={2}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Recent Orders</Typography>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                setViewAllBtn(!viewAllbtn);
              }}
            >
              {viewAllbtn ? "View Less" : "view All"}
            </Button>
          </Box>
          <List>
            {recentOrders.map((order, index) => (
              <ListItem key={index} divider={index < recentOrders.length}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "primary.light" }}>
                    <OrdersIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={order.orderId}
                  secondary={order?.user?.fullname}
                />
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{ textAlign: "center" }}
                  >
                    {order.totalAmount}
                  </Typography>
                  <Chip label={order.status} color="success" size="small" />
                </Box>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
