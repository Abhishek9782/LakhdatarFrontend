import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import { getProducts, deleteProducts } from "../../../services/authService";
import { Nav } from "../Components/LeftSlid/Nav";
import { UpdateProduct } from "../updateProduct/UpdateProduct";
import { AddProduct } from "../AddProduct/AddProduct";
import { axiosPut, imageUrl } from "../../../axios";

// Material-UI Components
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Pagination,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ADMIN_BASE_URL } from "../../../utils/baseUrl";
import { useCookies } from "react-cookie";

const AdminProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchItem, setSearchItem] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [cookies] = useCookies(["jwt"]);
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [debouncedSearchItem, setDebouncedSearchItem] = useState("");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const token = window.localStorage.getItem("user");
  const navigate = useNavigate();

  // Debouncing
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setDebouncedSearchItem(searchItem);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchItem]);

  // Fetch products with pagination & search
  const getAllProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getProducts({
        pageSize,
        pageNumber: currentPage,
        searchItem: debouncedSearchItem,
      });

      if (res.status === 1) {
        setProducts(res.data.products);
        setTotalProducts(res.data.totalproduct);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      // Here we are removing localstorage old token
      localStorage.removeItem("user");
      navigate("/lakhdatar/admin/login");
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, debouncedSearchItem]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  // Handle product deletion
  const handleDelete = async (id) => {
    try {
      // const res = await axios.put(
      //   `${ADMIN_BASE_URL}/product/deleteproduct/${id}`,
      //   {},
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      const res = await deleteProducts(id);
      if (res.status) {
        toast.success(res.message);
        getAllProducts();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete product");
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  // Handle pagination
  const handlePageChange = (event, pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(totalProducts / pageSize)) {
      setCurrentPage(pageNumber);
    }
  };

  // Handle page size change
  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  // Handle product search
  const handleSearch = (e) => {
    setSearchItem(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  // Handle search submit
  // const handleSearchSubmit = (e) => {
  //   e.preventDefault();
  //   getAllProducts();
  // };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const handleSetisAdd = (value) => {
    console.log(value, "value is here ");
    setIsAdd(value);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Nav activeIndex={1} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: theme.palette.background.default,
          height: "100vh",
          overflow: "scroll",
        }}
      >
        <Container maxWidth="xl">
          {/* Top Bar with Search and Add Product */}
          <Box
            sx={{
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              gap: 2,
            }}
          >
            <Box
              component="form"
              // onSubmit={handleSearchSubmit}
              sx={{ width: isSmallScreen ? "100%" : "auto" }}
            >
              <TextField
                fullWidth
                size="small"
                placeholder="Search products..."
                variant="outlined"
                value={searchItem}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: searchItem && (
                    <IconButton
                      type="submit"
                      color="primary"
                      disabled={!searchItem}
                    >
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
                sx={{
                  minWidth: isSmallScreen ? "100%" : 300,
                  backgroundColor: theme.palette.background.paper,
                }}
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setIsAdd(true)}
              sx={{
                ml: isSmallScreen ? 0 : 2,
                width: isSmallScreen ? "100%" : "auto",
              }}
            >
              Add Product
            </Button>
          </Box>

          {/* Products Table */}
          <Paper
            elevation={3}
            sx={{
              mb: 3,
              overflow: "hidden",
              borderRadius: 2,
            }}
          >
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 200,
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow
                      sx={{ backgroundColor: theme.palette.primary.main }}
                    >
                      <TableCell sx={{ color: "white" }}>Image</TableCell>
                      <TableCell sx={{ color: "white" }}>Name</TableCell>
                      <TableCell sx={{ color: "white" }}>Full Price</TableCell>
                      <TableCell sx={{ color: "white" }}>Half Price</TableCell>
                      <TableCell sx={{ color: "white" }}>Type</TableCell>
                      <TableCell sx={{ color: "white" }} align="center">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.length > 0 ? (
                      products.map((prod) => (
                        <TableRow
                          key={prod._id}
                          hover
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>
                            <Avatar
                              // src={`${imageUrl}${prod.src}`}
                              src={prod.src}
                              alt={prod.name}
                              variant="rounded"
                              sx={{ width: 56, height: 56 }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body1"
                              fontWeight="medium"
                              sx={{ color: "black" }}
                            >
                              {prod.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={`${prod.fullprice}₹`}
                              color="success"
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={`${prod.halfprice}₹`}
                              color="info"
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={prod.foodType}
                              color={
                                prod.foodType === "veg" ? "success" : "error"
                              }
                              size="small"
                            />
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              justifyContent: "space-around",
                            }}
                          >
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <IconButton
                                color="error"
                                onClick={() => setSelectedProduct(prod)}
                                aria-label="edit"
                                sx={{ backgroundColor: "green" }}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                color="error"
                                onClick={() => handleDeleteClick(prod)}
                                aria-label="delete"
                                sx={{
                                  backgroundColor: "red",
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <Typography variant="body1" color="textSecondary">
                            No products available
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>

          {/* Pagination */}
          {totalProducts > 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: isSmallScreen ? "column" : "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                p: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Showing{" "}
                {Math.min((currentPage - 1) * pageSize + 1, totalProducts)} to{" "}
                {Math.min(currentPage * pageSize, totalProducts)} of{" "}
                {totalProducts} products
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Pagination
                  count={Math.ceil(totalProducts / pageSize)}
                  page={currentPage}
                  onChange={handlePageChange}
                  shape="rounded"
                  color="primary"
                  siblingCount={isSmallScreen ? 0 : 1}
                  sx={{ color: "black" }}
                />

                <Select
                  size="small"
                  value={pageSize}
                  onChange={handlePageSizeChange}
                  sx={{
                    minWidth: 80,
                    backgroundColor: "rgb(25, 118, 210)",
                    color: "white",
                    "& .MuiSelect-icon": {
                      color: "white",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(25, 118, 210)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: "rgb(25, 118, 210)",
                        color: "white",
                      },
                    },
                  }}
                >
                  {[10, 20, 50, 100].map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          )}
        </Container>
      </Box>

      {/* Update Product Dialog */}
      {selectedProduct && (
        <UpdateProduct
          product={selectedProduct}
          getAllProducts={getAllProducts}
          hide={setSelectedProduct}
        />
      )}

      {/* Add Product Dialog */}
      {isAdd && (
        <AddProduct setIsAdd={handleSetisAdd} getAllProducts={getAllProducts} />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle sx={{ color: "black" }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "black" }}>
            Are you sure you want to delete{" "}
            <strong style={{ color: "black" }}>{productToDelete?.name}</strong>?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button
            onClick={() => handleDelete(productToDelete?._id)}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminProducts;
