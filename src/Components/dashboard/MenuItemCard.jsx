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
  Edit as EditIcon,
  Delete as DeleteIcon,
  Fastfood as FoodIcon,
} from "@mui/icons-material";

const MenuItemCard = ({ item, onEdit, onDelete, ...props }) => {
  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit?.(item);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete?.(item);
  };

  return (
    <Card
      elevation={1}
      sx={{
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
        cursor: "pointer",
        opacity: item.status === "inactive" ? 0.7 : 1,
      }}
      {...props}
    >
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          {/* Item Image */}
          <Avatar
            src={item.image}
            variant="rounded"
            sx={{
              width: 80,
              height: 80,
              borderRadius: 2,
            }}
          >
            <FoodIcon />
          </Avatar>

          {/* Item Details */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Status & Actions */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 1,
              }}
            >
              <Chip
                label={item.status === "active" ? "Active" : "Inactive"}
                color={item.status === "active" ? "success" : "default"}
                size="small"
                variant="outlined"
              />
              <Box sx={{ display: "flex", gap: 0.5 }}>
                <IconButton
                  size="small"
                  onClick={handleEdit}
                  sx={{
                    color: "primary.main",
                    "&:hover": { backgroundColor: "primary.light" },
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleDelete}
                  sx={{
                    color: "error.main",
                    "&:hover": { backgroundColor: "error.light" },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* Item Name */}
            <Typography variant="h6" fontWeight="bold" noWrap sx={{ mb: 0.5 }}>
              {item.name}
            </Typography>

            {/* Price */}
            <Typography
              variant="body1"
              color="primary.main"
              fontWeight="bold"
              sx={{ mb: 1 }}
            >
              {item.price}
            </Typography>

            {/* Category & Description */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Chip
                label={item.category}
                size="small"
                variant="outlined"
                color="primary"
              />
            </Box>

            {item.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {item.description}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
