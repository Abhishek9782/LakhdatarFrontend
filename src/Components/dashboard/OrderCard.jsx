import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  ReceiptLong as OrderIcon,
  CheckCircle as CompletedIcon,
  AccessTime as PendingIcon,
  Cancel as CancelledIcon,
  MoreVert as MoreIcon,
} from "@mui/icons-material";
import { ORDER_STATUS } from "../../utils/constants";

const OrderCard = ({ order, onAction, ...props }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case ORDER_STATUS.COMPLETED:
        return <CompletedIcon />;
      case ORDER_STATUS.PENDING:
        return <PendingIcon />;
      case ORDER_STATUS.CANCELLED:
        return <CancelledIcon />;
      default:
        return <OrderIcon />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case ORDER_STATUS.COMPLETED:
        return "success";
      case ORDER_STATUS.PREPARING:
        return "primary";
      case ORDER_STATUS.PENDING:
        return "warning";
      case ORDER_STATUS.CANCELLED:
        return "error";
      default:
        return "default";
    }
  };

  const formatTime = (timeString) => {
    return timeString; // In real app, you'd format this properly
  };

  return (
    <Card
      elevation={1}
      sx={{
        transition: "all 0.2s ease",
        "&:hover": {
          elevation: 4,
          transform: "translateY(-2px)",
        },
        cursor: "pointer",
      }}
      {...props}
    >
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
          {/* Order Icon */}
          <Avatar
            sx={{
              bgcolor: `${getStatusColor(order.status)}.light`,
              color: `${getStatusColor(order.status)}.main`,
              width: 48,
              height: 48,
            }}
          >
            {getStatusIcon(order.status)}
          </Avatar>

          {/* Order Details */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 1,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" noWrap>
                {order.id}
              </Typography>
              <IconButton size="small">
                <MoreIcon />
              </IconButton>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
              sx={{ mb: 1 }}
            >
              {order.customer} • {formatTime(order.time)}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" fontWeight="bold" color="primary.main">
                {order.amount}
              </Typography>
              <Chip
                label={order.status}
                color={getStatusColor(order.status)}
                size="small"
                variant={
                  order.status === ORDER_STATUS.PENDING ? "outlined" : "filled"
                }
              />
            </Box>
          </Box>
        </Box>

        {/* Order Items Preview */}
        {order.items && (
          <Box sx={{ mt: 2, pt: 1, borderTop: 1, borderColor: "divider" }}>
            <Typography variant="caption" color="text.secondary">
              Items: {order.items.slice(0, 2).join(", ")}
              {order.items.length > 2 && ` +${order.items.length - 2} more`}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderCard;
