import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const StatsCard = ({
  title,
  value,
  icon,
  color = "primary",
  subtitle,
  trend,
  ...props
}) => {
  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
      {...props}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="text.primary"
              sx={{ mb: 1 }}
            >
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
            {trend && (
              <Typography
                variant="caption"
                color={trend.value > 0 ? "success.main" : "error.main"}
                sx={{ display: "block", mt: 0.5 }}
              >
                {trend.value > 0 ? "↑" : "↓"} {Math.abs(trend.value)}%{" "}
                {trend.label}
              </Typography>
            )}
          </Box>
          {icon && (
            <Box
              sx={{
                backgroundColor: `${color}.light`,
                borderRadius: 2,
                p: 1.5,
                color: `${color}.main`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
