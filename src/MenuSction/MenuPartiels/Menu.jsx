import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Chip,
  Stack,
  Pagination,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { FavCheck } from "../../store/FavPSlice";
import { axiosGet, axiosPost, imageUrl } from "../../axios";
// import { toast } from "react-toastify";
import { toast } from "react-hot-toast";
import { useJwt } from "react-jwt";
import { Link } from "react-router-dom";
import { cartAdd, cartQuantityHandle } from "../../store/cartSlice";

// Custom styled card with glass effect
const GlassCard = styled(motion.div)(({ theme }) => ({
  backdropFilter: "blur(10px)",
  background: "rgba(255,255,255,0.1)",
  borderRadius: "20px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
  overflow: "hidden",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 45px rgba(0,0,0,0.3)",
  },
}));

const Menu = () => {
  const user = useSelector((state) => state.user.user);
  const favoriteProducts = useSelector((state) => state.favprod.favProduct);
  const dispatch = useDispatch();
  const jwtVerify = useJwt(user);
  const userId = jwtVerify.decodedToken?.id || null;

  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(true);
  const [activeType, setActiveType] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortOption, setSortOption] = useState("");

  const GetProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosPost("food/", {
        pageNumber: pageNum,
        pageSize: rowsPerPage,
      });
      if (res.status === 1) {
        setFood(res.data.data);
        setNextPage(res.data.hasNextPage);
      }
    } catch (error) {
      toast.error("Error fetching food items");
    } finally {
      setLoading(false);
    }
  }, [pageNum, rowsPerPage]);

  useEffect(() => {
    GetProducts();
  }, [GetProducts]);

  useEffect(() => {
    if (sortOption && food.length > 0) {
      const sortedFood = [...food];
      switch (sortOption) {
        case "priceLowToHigh":
          sortedFood.sort((a, b) => a.fullprice - b.fullprice);
          break;
        case "priceHighToLow":
          sortedFood.sort((a, b) => b.fullprice - a.fullprice);
          break;
        case "ratingHighToLow":
          sortedFood.sort((a, b) => b.rating - a.rating);
          break;
        case "ratingLowToHigh":
          sortedFood.sort((a, b) => a.rating - b.rating);
          break;
        default:
          break;
      }
      setFood(sortedFood);
    }
  }, [sortOption]);

  const handleMenu = async (e, type) => {
    e.preventDefault();
    setActiveType(type);
    setLoading(true);
    setSortOption("");
    try {
      const res = await axiosGet(`food/type/${type}`);
      if (res.status === 1) setFood(res.data);
      else setFood([]);
    } catch (err) {
      toast.error("Error loading food");
    } finally {
      setLoading(false);
    }
  };

  const handleFavProduct = (e, id) => {
    e.preventDefault();
    dispatch(
      FavCheck(
        favoriteProducts.includes(id)
          ? favoriteProducts.filter((prod) => prod !== id)
          : [...favoriteProducts, id]
      )
    );
  };

  const handleChangePage = (event, newPage) => {
    setPageNum(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNum(0); // reset to first page
  };

  // Add to cart handle

  async function handleCart(e, id) {
    e.preventDefault();
    if (user == null) {
      dispatch(cartAdd(id));
      dispatch(cartQuantityHandle(1));
    } else {
      const res = await axiosPost(`addToCart/${id}`).catch((err) => {
        if (err) {
          toast.error(err.message);
        }
      });
      if (res.status) {
        toast.success(res.message);
        dispatch(cartQuantityHandle(1));
      }
    }
  }

  const foodTypes = [
    "BreakFast",
    "Lunch",
    "Dinner",
    "Our Special",
    "Paneer Special",
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h3"
        textAlign="center"
        fontWeight="bold"
        mt={12}
        mb={4}
        sx={{ color: "#ff4081" }}
      >
        Explore Our Menu
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        flexWrap="wrap"
        mb={5}
      >
        {foodTypes.map((type) => (
          <Chip
            key={type}
            label={type}
            color={activeType === type ? "primary" : "primary"}
            variant={activeType === type ? "filled" : "outlined"}
            clickable
            onClick={(e) => handleMenu(e, type)}
            sx={{
              fontWeight: 600,
              fontSize: "1rem",
              px: 2,
              py: 1,
              "& .MuiChip-label": {
                color: activeType === type ? "white" : "#0288d1",
              },
            }}
          />
        ))}
      </Stack>

      {loading ? (
        <Box textAlign="center" py={6}>
          <Typography variant="h6" sx={{ color: "black" }}>
            Loading delicious dishes...
          </Typography>
        </Box>
      ) : food.length > 0 ? (
        <>
          <Stack
            direction="row"
            justifyContent="flex-end"
            mb={3}
            mr={4}
            sx={{ position: "relative", bottom: "80px" }}
          >
            <FormControl
              variant="outlined"
              sx={{
                minWidth: 200,
                // bgcolor: "#0288d1",
                borderRadius: 2,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#0288d1",
                },
                "& .MuiSvgIcon-root": {
                  color: "#0288d1",
                },
                height: "30px",
              }}
            >
              <InputLabel
                sx={{ color: "#0288d1", fontWeight: "bold" }}
                id="sort-label"
              >
                Sort By
              </InputLabel>

              <Select
                labelId="sort-label"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                label="Sort By"
                sx={{
                  fontWeight: "bold",
                  color: "#0288d1", // 👈 sets the selected value color
                  "& .MuiSelect-icon": {
                    color: "black",
                    fontSize: "10px",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "#0288d1", // dropdown background
                      "& .MuiMenuItem-root": {
                        fontWeight: "bold",
                        "&:hover": {
                          bgcolor: "#0277bd",
                          color: "white",
                        },
                        "&.Mui-selected": {
                          bgcolor: "#0288d1",
                          color: "yellow",
                          "&:hover": {
                            bgcolor: "#0277bd",
                          },
                        },
                      },
                    },
                  },
                }}
              >
                <MenuItem value="">Sort By</MenuItem>
                <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
                <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
                <MenuItem value="ratingHighToLow">Rating: High to Low</MenuItem>
                <MenuItem value="ratingLowToHigh">Rating: Low to High</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Grid container spacing={5} justifyContent={"center"}>
            {food.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <GlassCard
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card
                    sx={{
                      borderRadius: 4,
                      bgcolor: "rgba(255, 255, 255, 0.8)",
                      boxShadow: 4,
                      backdropFilter: "blur(10px)",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      width: "20rem",
                    }}
                  >
                    {/* Image */}
                    <Box sx={{ position: "relative" }}>
                      <Link to={`/menu/${item._id}`}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={`${imageUrl}/${item.src}`}
                          alt={item.name}
                          sx={{
                            objectFit: "cover",
                            borderTopLeftRadius: 16,
                            borderTopRightRadius: 16,
                          }}
                        />
                      </Link>
                      <IconButton
                        onClick={(e) => handleFavProduct(e, item._id)}
                        sx={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          transition: "all ease .0.5s",
                          backgroundColor: favoriteProducts.includes(item._id)
                            ? "red"
                            : "transparent",
                          "&:hover": {
                            backgroundColor: "red",
                          },
                        }}
                      >
                        {favoriteProducts.includes(item._id) ? (
                          <FavoriteIcon sx={{ color: "#f44336" }} /> // Material UI red
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </IconButton>
                    </Box>

                    {/* Content */}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="black"
                        gutterBottom
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        {item.name}

                        <Chip
                          label={item.rating > 3 ? `${item.rating} ⭐` : "New"}
                          color={item.rating > 3 ? "success" : "warning"}
                          size="big"
                          sx={{
                            marginLeft: "5rem",
                            position: "absolute",
                            top: "12em",
                            right: "5px ",
                          }}
                        />
                      </Typography>

                      {/* Row: Category + Chips */}
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        flexWrap="wrap"
                        justifyContent="space-between"
                      >
                        <Typography variant="body2" color="text.secondary">
                          {item.food}
                        </Typography>

                        {/* Full/Half Chips */}

                        <Typography>
                          <Chip
                            label="Full"
                            color="info"
                            size="small"
                            sx={{
                              px: 2,
                              py: 1,
                              fontWeight: "bold",
                              "& .MuiChip-label": {
                                color: "white",
                              },
                              ml: "auto", // push chips to the right
                              cursor: "pointer",
                              margin: "2px ",
                            }}
                          />
                          <Chip
                            label="Half"
                            variant="outlined"
                            size="small"
                            sx={{
                              px: 2,
                              py: 1,
                              fontWeight: "bold",
                              cursor: "pointer",
                              "& .MuiChip-label": {
                                color: "black",
                              },
                              "&:hover": {
                                bgcolor: "#0288d1",
                                "& .MuiChip-label": {
                                  color: "white",
                                },
                                borderColor: "#0288d1", // optional: match outline with background
                              },
                            }}
                          />
                        </Typography>
                      </Stack>
                    </CardContent>

                    {/* Bottom Actions */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        px: 2,
                        pb: 2,
                        mt: "auto",
                      }}
                    >
                      <Typography fontWeight="bold" fontSize={20} color="black">
                        ₹ {item.fullprice}
                      </Typography>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          bgcolor: "black",
                          color: "white",
                          textTransform: "none",
                          fontWeight: "bold",
                          px: 3,
                        }}
                        onClick={(e) => {
                          handleCart(e, item._id);
                        }}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </Card>
                </GlassCard>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Typography variant="h6" textAlign="center" color="black">
          No items available at the moment.
        </Typography>
      )}

      <TablePagination
        sx={{
          marginTop: "5rem",
          color: "black",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline",
          flexWrap: "wrap",
          "& .MuiTablePagination-toolbar": {
            width: "100%",
            justifyContent: "end",
            alignItems: "baseline",
            flexWrap: "wrap",
          },
          "& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
            {
              fontWeight: "bold",
              color: "#0288d1",
            },
          "& .MuiSelect-select": {
            backgroundColor: "#0288d1",
            color: "white",
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: "#0277bd",
            },
          },
          "& .MuiTablePagination-actions": {
            display: "flex",
            alignItems: "center",
          },
          "& .MuiTablePagination-actions button:first-of-type": {
            color: "white", // Color for left arrow (previous page)
            backgroundColor: "#0288d1",
            margin: "0px 10px",
          },
          "& .MuiTablePagination-actions button:last-of-type": {
            color: "white", // Color for right arrow (next page)
            backgroundColor: "#0288d1",
          },
          "& .MuiIconButton-root:hover": {
            backgroundColor: "rgba(2, 136, 209, 0.1)",
          },
        }}
        component="div"
        count={100}
        page={pageNum}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                backgroundColor: "#0288d1",
                color: "white",
                "& .MuiMenuItem-root": {
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#0277bd",
                    color: "black",
                  },
                },
              },
            },
          },
        }}
      />
    </Box>
  );
};

export default Menu;
