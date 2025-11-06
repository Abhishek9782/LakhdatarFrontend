import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  TextField,
  Button,
  Avatar,
  Rating,
  IconButton,
} from "@mui/material";
import {
  Send as SendIcon,
  SwapVert as SortIcon,
  KeyboardArrowDown as FilterIcon,
} from "@mui/icons-material";

const Reviews = () => {
  const [activeFilter, setActiveFilter] = useState("newest");
  const [replyText, setReplyText] = useState("");

  const stats = [
    {
      label: "Average Rating",
      value: "4.8",
      subtext: "Based on 1,204 reviews",
    },
    { label: "Total Reviews", value: "1,204" },
  ];

  const reviews = [
    {
      id: 1,
      customer: "Priya Sharma",
      date: "2 days ago",
      rating: 5,
      comment:
        "The food was absolutely delicious! The packaging was great and delivery was on time. Will definitely order again.",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAFCb_I2DskdOZ97_-BhfyS_ikDkcqp3lJ4E8m48nDN_sL3wjclhvXhCxLqM5HIbZKN2yfWQgTC-5Rvn8X5EBuv_0kwXld2lLCkFenTtIO0y53AHhg6M5mLmq4GllGwdkFkSZjAIHtX7ACyaqu62mcxityweD7QAP_iP6YGsRbHmXEfX8RuvDfeNTq6l0VTHVMEXNjtNQ-Boqoi95GMLH35w_edIm0E07-m34zlNBV_zBxD0j4mZB90jfXWptGg079nM9nBbq-iKYf8",
      hasReply: false,
    },
    {
      id: 2,
      customer: "Rajesh Kumar",
      date: "4 days ago",
      rating: 4,
      comment:
        "Good experience overall. The curry was a bit spicy for my taste, but the quality was excellent.",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDmBaRkUKVoLf1ndyEmEJJmS0ShtJ6HAUjyizqvkQN5QBwiMrttN7QcgvO5002eney0fdelueHTY5PR1idBy9w6H07QHCI9-0WWXqUtI4_AuIRg5_52_iVi6uKtbbsyRapBBtWfe6uaFH5Mohv89ffhw74fyQQQvG31BFr9bfg6RfsphJmPT5QIUmEb1iNyq3KBCguqoqPemPko1r5njU36WRILRzeO83A_GmKbP8OydXqUzHc_7oWSxtISnCI51SmEYEjdv899LKET",
      hasReply: true,
      reply: {
        text: "Thank you, Rajesh! We appreciate your feedback and are glad you enjoyed the quality. We'll take your comment about the spice level into consideration. Hope to serve you again!",
        date: "3 days ago",
      },
    },
  ];

  const filters = [
    { label: "Newest First", value: "newest", icon: <SortIcon /> },
    { label: "5 stars", value: "5-stars", icon: <FilterIcon /> },
    { label: "With Photos", value: "with-photos", icon: <FilterIcon /> },
  ];

  return (
    <Box sx={{ p: 2 }}>
      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.map((stat, index) => (
          <Grid item xs={6} key={index}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {stat.label}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {stat.value}
                </Typography>
                {stat.subtext && (
                  <Typography variant="caption" color="text.secondary">
                    {stat.subtext}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 1, mb: 3, overflowX: "auto" }}>
        {filters.map((filter) => (
          <Chip
            key={filter.value}
            label={filter.label}
            icon={filter.icon}
            onClick={() => setActiveFilter(filter.value)}
            color={activeFilter === filter.value ? "primary" : "default"}
            variant={activeFilter === filter.value ? "filled" : "outlined"}
          />
        ))}
      </Box>

      {/* Reviews List */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {reviews.map((review) => (
          <Card key={review.id} elevation={2}>
            <CardContent>
              {/* Review Header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  mb: 2,
                }}
              >
                <Avatar src={review.avatar} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {review.customer}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {review.date}
                  </Typography>
                </Box>
                <Rating value={review.rating} readOnly size="small" />
              </Box>

              {/* Review Comment */}
              <Typography variant="body2" sx={{ mb: 2 }}>
                {review.comment}
              </Typography>

              {/* Reply Section */}
              {review.hasReply ? (
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "grey.50",
                    borderRadius: 1,
                    borderLeft: "4px solid",
                    borderColor: "primary.main",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Avatar
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6Qtx8OM8obE4moxc5go-L0dV2Hu6RoAo-r2NQPa3ofzcWJKlzxHLozKfC8HqusYgwaSudxnl8fa4lTlUHnDvsxSl91kbtQPsTDGe1-ATmf1N6vI9A1X_nXXuBiWt3ngkto6227t5FDSAzv1-ts-ecybIHS4532sNY7IuLEnAAndEdMFgibw92quhSmGb-Z7AQhSgF-n41Lglz4K4sNHrQKqhxhYLV5FXpJGFM1sojLx7m2cLOnk-aU19q-rD6hebGfJjG0fRtWKOG"
                      sx={{ width: 24, height: 24 }}
                    />
                    <Typography variant="subtitle2" fontWeight="bold">
                      Lakhdatar Restaurant
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {review.reply.date}
                    </Typography>
                  </Box>
                  <Typography variant="body2">{review.reply.text}</Typography>
                </Box>
              ) : (
                <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                  <Avatar
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxzIynV5t6OfzV_BaqnbERNijipv1Fkd_fZcaY1zMl9MdJABeT0skkUN9ryShciLog9LEPCTPhXNOu19tV5x-UhqMbdbKKav8KMiTNxo0aItB53dC21aPIzeCtl2dHYeOGsV8Yc55d3YAwrM3FKoANd9vjTijXF9NN4nip9DAjpTtiH5uyX2Ett1IGFaONyeHjnjQs0_LCOd_zn_OjrvVisAmiBM2cRlBeDZONEgm8gYU8HDMoQa6GxluRzr0y-sKJQqCLaFrZO0Qr"
                    sx={{ width: 32, height: 32, mt: 1 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      placeholder="Write a reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      size="small"
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 1,
                      }}
                    >
                      <Button
                        variant="contained"
                        endIcon={<SendIcon />}
                        size="small"
                        disabled={!replyText.trim()}
                      >
                        Send
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Reviews;
