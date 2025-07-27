import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  MenuItem,
  Grid,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { axiosPost } from "../axios";
import { toast } from "react-hot-toast";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { axiosRequest, userEndPoints } from "../utils/baseUrl";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/userSlice";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const mockOrders = [
  {
    id: "ORD1234",
    status: "Pending",
    date: "2025-06-01",
    amount: "₹499",
  },
  {
    id: "ORD1235",
    status: "Completed",
    date: "2025-06-05",
    amount: "₹1299",
  },
  {
    id: "ORD1236",
    status: "Failed",
    date: "2025-06-04",
    amount: "₹299",
  },
];

const statuses = ["All", "Pending", "Processing", "Completed", "Failed"];
const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState("All");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [orders, setOrders] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);

  const getAllOrders = useCallback(async () => {
    const res = await axiosRequest("user", "post", userEndPoints.getAllorder, {
      status: status,
      startDate: startDate,
      endDate: endDate,
    });

    if (res.success) {
      setOrders(res.data?.data?.orders);
      setTotalOrder(res.data?.data?.totalOrder);
      toast.success(res.data?.message);
    }

    if (!res.success && res.status === 401) {
      toast.error("Session Expire...");
      dispatch(logout());
      navigate("/user-login");
    }
  }, [status, startDate, endDate]);

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  // const filteredOrders = orders.filter((order) => {
  //   const orderDate = dayjs(order.orderDate);

  //   const statusMatch =
  //     status === "All" || order.status.toLowerCase() === status.toLowerCase();
  //   const startMatch = startDate
  //     ? orderDate.isSameOrAfter(startDate, "day")
  //     : true;
  //   const endMatch = endDate ? orderDate.isSameOrBefore(endDate, "day") : true;

  //   return statusMatch && startMatch && endMatch;
  // });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 4, mt: 7 }}>
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ position: "relative" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  select
                  label="Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {statuses.map((option) => (
                    <MenuItem
                      key={option}
                      value={option}
                      sx={{ color: "Black" }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} md={4}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputLabelProps: {
                        style: { color: "black" },
                      },
                      InputProps: {
                        style: { color: "black" },
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "black",
                  position: "absolute",
                  right: "20px ",
                  bottom: "20px",
                  alignContent: "center",
                }}
              >
                Result Shows : {totalOrder}
              </Typography>
            </Grid>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr No.</TableCell>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.length ? (
                  orders.map((order, i) => (
                    <TableRow key={order._id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{order.orderId}</TableCell>
                      {order.status === "pending" ? (
                        <TableCell sx={{ color: "#ffae00" }}>
                          {order.status}
                        </TableCell>
                      ) : order.status === "processing" ? (
                        <TableCell sx={{ color: "orange" }}>
                          {order.status}
                        </TableCell>
                      ) : order.status === "cancelled" ? (
                        <TableCell sx={{ color: "red" }}>
                          {order.status}
                        </TableCell>
                      ) : (
                        <TableCell sx={{ color: "green" }}>
                          {order.status}
                        </TableCell>
                      )}
                      <TableCell>{`${dayjs(order.orderDate).$D}-${
                        dayjs(order.orderDate).$M
                      }-${dayjs(order.orderDate).$y}`}</TableCell>
                      <TableCell>{order.totalAmount}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => {
                            alert(
                              `you clicked on this button order id :${order.orderId} `
                            );
                          }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>
    </LocalizationProvider>
  );
};

export default Orders;
