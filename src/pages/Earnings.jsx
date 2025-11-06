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
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import {
  CurrencyRupee as RevenueIcon,
  ShoppingBag as OrdersIcon,
  PendingActions as PendingIcon,
  Star as StarIcon,
  TrendingUp as IncomeIcon,
  TrendingDown as WithdrawalIcon,
  AccountBalanceWallet as WalletIcon,
} from "@mui/icons-material";

const Earnings = () => {
  const stats = [
    {
      label: "Today's Revenue",
      value: "₹8,520",
      icon: <RevenueIcon />,
      color: "primary",
    },
    {
      label: "Today's Orders",
      value: "72",
      icon: <OrdersIcon />,
      color: "secondary",
    },
    {
      label: "Pending Orders",
      value: "5",
      icon: <PendingIcon />,
      color: "warning",
    },
    { label: "Avg. Rating", value: "4.8", icon: <StarIcon />, color: "info" },
  ];

  const transactions = [
    {
      id: "#5124",
      date: "Oct 26, 2023",
      amount: "+ ₹450.00",
      commission: "₹22.50",
      type: "income",
    },
    {
      id: "#5123",
      date: "Oct 26, 2023",
      amount: "+ ₹1250.75",
      commission: "₹62.53",
      type: "income",
    },
    {
      id: "#5122",
      date: "Oct 25, 2023",
      amount: "- ₹5000.00",
      type: "withdrawal",
    },
    {
      id: "#5121",
      date: "Oct 25, 2023",
      amount: "+ ₹890.00",
      commission: "₹44.50",
      type: "income",
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      {/* Stats Grid */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.map((stat, index) => (
          <Grid item xs={6} key={index}>
            <Card elevation={2}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                    color: `${stat.color}.main`,
                  }}
                >
                  {stat.icon}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Income Chart */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Income Overview</Typography>
            <ToggleButtonGroup size="small" exclusive value="monthly">
              <ToggleButton value="weekly">Weekly</ToggleButton>
              <ToggleButton value="monthly">Monthly</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          {/* Chart placeholder */}
          <Box
            sx={{
              height: 200,
              background:
                "linear-gradient(180deg, #FF993320 0%, #FF993300 100%)",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography color="text.secondary">Income Chart</Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Transactions
          </Typography>
          <List>
            {transactions.map((transaction, index) => (
              <ListItem key={index} divider={index < transactions.length - 1}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor:
                        transaction.type === "income"
                          ? "success.light"
                          : "error.light",
                    }}
                  >
                    {transaction.type === "income" ? (
                      <IncomeIcon />
                    ) : (
                      <WithdrawalIcon />
                    )}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    transaction.type === "income"
                      ? `Order ${transaction.id}`
                      : "Withdrawal"
                  }
                  secondary={transaction.date}
                />
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color={
                      transaction.type === "income"
                        ? "success.main"
                        : "error.main"
                    }
                  >
                    {transaction.amount}
                  </Typography>
                  {transaction.commission && (
                    <Typography variant="caption" color="text.secondary">
                      Comm: {transaction.commission}
                    </Typography>
                  )}
                </Box>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Withdrawal Button */}
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          startIcon={<WalletIcon />}
          fullWidth
          size="large"
        >
          Request Withdrawal
        </Button>
      </Box>
    </Box>
  );
};

export default Earnings;
