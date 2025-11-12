import React, { useEffect, useState } from "react";
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
import { totalOrders } from "../api/vendorApi";

const OrderManagement = () => {
  const [filter, setFilter] = useState("all");
  const [orders, setOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [status, setStatus] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [filterdOrder, setFilterOrder] = useState([]);

  const fetchData = async () => {
    const data = {
      searchItem,
      pageNumber,
      pageSize,
      sortBy,
      sortOrder,
      status,
    };
    const res = await totalOrders(data);
    if (res) {
      setOrders(res.orders);
      setFilterOrder(res.orders);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = [
    { label: "Today's Total Sales", value: "₹12,500" },
    { label: "Total Orders Today", value: "56" },
    { label: "Pending Orders", value: "4" },
  ];

  const handleFilterChange = (event) => {
    let newFilter = event.target.value;
    if (newFilter !== null) {
      setFilter(newFilter);
    }
    if (newFilter == "all") {
      setFilterOrder(orders);
      setFilter("all");
      return;
    }
    const filterOrder = orders.filter((order) => {
      return order.status === newFilter;
    });
    // set orders filter
    setFilterOrder(filterOrder);
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
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="pending">Pending</ToggleButton>
            <ToggleButton value="pick-up">Pick-Up</ToggleButton>
            <ToggleButton value="preparing">preparing</ToggleButton>
            <ToggleButton value="completed">Completed</ToggleButton>
            <ToggleButton value="cancelled">Cancelled</ToggleButton>
            <ToggleButton value="out-for-delivery">
              Out For Delivery
            </ToggleButton>
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
            {filterdOrder.map((order, index) => (
              <ListItem
                key={index}
                divider={index < orders.length - 1}
                sx={{
                  opacity: order.status === "Completed" ? 0.7 : 1,
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "grey.100" }}>
                    {order.status === "completed" ? (
                      <CompletedIcon />
                    ) : (
                      <OrderIcon />
                    )}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={order.orderId}
                  secondary={`${order?.user?.fullname}, ${order.createdAt}`}
                />
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="body1" fontWeight="bold">
                    ₹{order.totalAmount}
                  </Typography>
                  <Chip
                    label={order.status}
                    color={order.status === "completed" ? "success" : "primary"}
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
