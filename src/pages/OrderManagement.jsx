import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
} from "@mui/material";
import {
  ReceiptLong as OrderIcon,
  CheckCircle as CompletedIcon,
} from "@mui/icons-material";

const OrderManagement = () => {
  const [filter, setFilter] = useState("pending");

  const stats = [
    { label: "Today's Total Sales", value: "₹12,500" },
    { label: "Total Orders Today", value: "56" },
    { label: "Pending Orders", value: "4" },
  ];

  const orders = [
    {
      id: "#1024",
      customer: "Rohan Sharma",
      time: "12:35 PM",
      amount: "₹450",
      status: "Preparing",
    },
    {
      id: "#1023",
      customer: "Priya Singh",
      time: "12:30 PM",
      amount: "₹820",
      status: "Preparing",
    },
    {
      id: "#1022",
      customer: "Anjali Verma",
      time: "12:15 PM",
      amount: "₹1,150",
      status: "Completed",
    },
  ];

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {stat.label}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filter Buttons */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <ToggleButtonGroup
            value={filter}
            onChange={handleFilterChange}
            exclusive
            fullWidth
          >
            <ToggleButton value="pending">Pending</ToggleButton>
            <ToggleButton value="completed">Completed</ToggleButton>
            <ToggleButton value="cancelled">Cancelled</ToggleButton>
          </ToggleButtonGroup>
        </CardContent>
      </Card>

      {/* Orders List */}
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Current Orders
          </Typography>
          <List>
            {orders.map((order, index) => (
              <ListItem
                key={index}
                divider={index < orders.length - 1}
                sx={{
                  opacity: order.status === "Completed" ? 0.7 : 1,
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "grey.100" }}>
                    {order.status === "Completed" ? (
                      <CompletedIcon />
                    ) : (
                      <OrderIcon />
                    )}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={order.id}
                  secondary={`${order.customer}, ${order.time}`}
                />
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="body1" fontWeight="bold">
                    {order.amount}
                  </Typography>
                  <Chip
                    label={order.status}
                    color={order.status === "Completed" ? "success" : "primary"}
                    size="small"
                  />
                </Box>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderManagement;
