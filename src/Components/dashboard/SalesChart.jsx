import React from "react";
import { Box, Typography } from "@mui/material";
import { CHART_COLORS } from "../../utils/constants";

const SalesChart = ({ data = [], timeframe = "daily", height = 200 }) => {
  // Sample data for demonstration
  const chartData =
    data.length > 0
      ? data
      : [
          { day: "Mon", sales: 4000 },
          { day: "Tue", sales: 3000 },
          { day: "Wed", sales: 5000 },
          { day: "Thu", sales: 4500 },
          { day: "Fri", sales: 6000 },
          { day: "Sat", sales: 8000 },
          { day: "Sun", sales: 7500 },
        ];

  const maxSales = Math.max(...chartData.map((item) => item.sales));
  const minHeight = 10; // Minimum bar height for visibility

  return (
    <Box sx={{ width: "100%", height }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "end",
          justifyContent: "space-between",
          height: height - 40,
          gap: 1,
          px: 1,
        }}
      >
        {chartData.map((item, index) => {
          const heightPercentage = Math.max(
            (item.sales / maxSales) * 100,
            minHeight
          );

          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Box
                sx={{
                  width: "80%",
                  height: `${heightPercentage}%`,
                  background: `linear-gradient(180deg, ${CHART_COLORS.primary} 0%, ${CHART_COLORS.secondary} 100%)`,
                  borderRadius: 1,
                  minHeight: 20,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    opacity: 0.8,
                    transform: "scale(1.05)",
                  },
                }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1, fontSize: "0.7rem" }}
              >
                {item.day}
              </Typography>
              <Typography
                variant="caption"
                color="text.primary"
                sx={{ fontWeight: "bold", fontSize: "0.7rem" }}
              >
                ₹{item.sales}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* Chart Info */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          px: 1,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {timeframe === "daily"
            ? "Daily Sales"
            : timeframe === "weekly"
            ? "Weekly Sales"
            : "Monthly Sales"}
        </Typography>
        <Typography
          variant="body2"
          color="success.main"
          sx={{ fontWeight: "bold" }}
        >
          +12.5% from last period
        </Typography>
      </Box>
    </Box>
  );
};

export default SalesChart;
