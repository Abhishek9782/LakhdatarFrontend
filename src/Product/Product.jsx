import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Rating,
  Stack,
  Divider,
  Chip,
  Button,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { axiosGet } from "../axios";
import { imageUrl } from "../axios";

const dummyReviews = [
  {
    name: "Anjali",
    rating: 5,
    comment: "Delicious and flavorful! Loved it!",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Ravi",
    rating: 4,
    comment: "Tastes authentic. A bit spicy for me though.",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Neha",
    rating: 4.5,
    comment: "Paneer was soft and creamy. Will order again!",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

const Product = () => {
  let productId = location.href.split("/")[4];
  const [product, setProduct] = useState({});

  const GetProduct = useCallback(async () => {
    try {
      const res = await axiosGet(`food/getProduct/${productId}`);
      if (res.data) {
        setProduct(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    GetProduct();
  }, []);

  return (
    <Box sx={{ mt: 12, px: 4, maxWidth: 1024, mx: "auto" }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
        color="#0288d1"
      >
        Product Details
      </Typography>

      <Card
        sx={{ display: "flex", borderRadius: 4, overflow: "hidden", mb: 4 }}
      >
        <CardMedia
          component="img"
          image={product.src}
          alt={product.name}
          sx={{ width: 300, height: 300, objectFit: "cover" }}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            color="text.primary"
          >
            {product.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom color="text.secondary">
            {product.food} | {product.foodType}
          </Typography>
          <Chip label="In Stock" color="success" sx={{ mr: 2 }} />
          <Chip label="10% Off Today" color="warning" />
          <Typography variant="body1" mt={2} color="text.primary">
            {product.desc}
          </Typography>
          <Stack direction="row" spacing={2} mt={2}>
            <Button variant="contained" color="primary">
              Add to Cart
            </Button>
            <Button variant="outlined" color="primary">
              Buy Now
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Box mb={4}>
        <Typography variant="h6" fontWeight="bold" gutterBottom color="#0288d1">
          Ingredients
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {["Paneer", "Butter", "Tomatoes", "Cream", "Spices"].map(
            (item, index) => (
              <Chip
                key={index}
                label={item}
                color="info"
                variant="outlined"
                sx={{
                  "& .MuiChip-label": {
                    color: "black",
                  },
                  borderColor: "#0288d1", // Optional: make sure border color matches or customize
                }}
              />
            )
          )}
        </Stack>
      </Box>

      <Box mb={4}>
        <Typography variant="h6" fontWeight="bold" gutterBottom color="#0288d1">
          Nutritional Info
        </Typography>
        <Stack direction="row" spacing={4}>
          <Typography variant="body1" color="black">
            Calories: 320 kcal
          </Typography>
          <Typography variant="body1" color="black">
            Protein: 12g
          </Typography>
          <Typography variant="body1" color="black">
            Fat: 24g
          </Typography>
          <Typography variant="body1" color="black">
            Carbs: 18g
          </Typography>
        </Stack>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="h6" fontWeight="bold" gutterBottom color="#0288d1">
          Customer Reviews
        </Typography>
        <List>
          {dummyReviews.map((review, i) => (
            <ListItem alignItems="flex-start" key={i}>
              <ListItemAvatar>
                <Avatar src={review.avatar} alt={review.name} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {review.name}
                    </Typography>
                    <Rating
                      value={review.rating}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                  </Stack>
                }
                secondary={
                  <Typography color="text.primary">{review.comment}</Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Product;
