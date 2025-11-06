import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Chip,
  IconButton,
  Fab,
  Avatar,
} from "@mui/material";
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";

const MenuManagement = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All" },
    { id: "starters", label: "Starters" },
    { id: "main", label: "Main Course" },
    { id: "desserts", label: "Desserts" },
    { id: "drinks", label: "Drinks" },
  ];

  const menuItems = [
    {
      id: 1,
      name: "Paneer Tikka",
      price: "₹250",
      category: "starters",
      status: "active",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC6WM0wv9YZiFcUbS6ulVGm_L2O-oD4X9yLkHw-3wgdx7twmCvZyQ4BNw19X_5bNBGyD2R-Qs13C7ixsRnvIhwwUA46pSephT81jHg7jBU1gNJjPHI8Pvi0bfG8EWmtDjNQ-mcPTE6XoRbtdkHrmd2sc4cRJKZfPPimApEFvLbNyfZa3LjCr4S_Jbe-gvDpXckJnJPmvGq9ycrsaJMI2x4CwfJiUpz7eny5tlwrrzrCi4LKO_OpzxIRptb_3p1Ec_cbV7sdroBLySdf",
    },
    {
      id: 2,
      name: "Butter Chicken",
      price: "₹450",
      category: "main",
      status: "active",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCiDGc_TRyzoMCDaezBtSUf6OPO1ZvmAby9eopSvlD0kgBxWp7oZqgi1npk4FFAvRrdE_9cVGW13N1s69dKnkpoMVCyqQo2vAKpPAxBvYRfcuyMm1N1Ypukon826Z4u6yh7vTE0SUciY9Ba2RJK9yf1FpePMzK8OJmHYIZFKPkzqUAPxE8kzWcSPZeMgHf9HOtUkweAVC8Vv1FUmgv4dq3ZYEI5KGN0lY9d1v8TQGcQXga9rEP1u_wrYLwZhBwHGulhMGedoOLZzT23",
    },
    {
      id: 3,
      name: "Samosa",
      price: "₹50",
      category: "starters",
      status: "inactive",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBItS420X1GqaqwyptyqoWPspfnUg2fMYu59kLZ2jtpr0-7SRSDb_LyaJiBWD7u341B-DFTdfi_BSESRh33Fi8vgGKqFa07BU4gBgUyKU12VTYGjeO1vc9wBEto8LviGvEVFWy61AcRWlO727gHO5Kod5gewoWkL-EQ8BEtBfi04lbvzdZl1cPnpfKQDsHQivQPBZLOEHHCKjSdV2nva0ClnwBx3SKYIUJrsRAekJ70ZmkwPFlIr5ic3aSs_K4z6PCOea1Pv2rKREAF",
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Your Menu Items
      </Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Search for a dish..."
        InputProps={{
          startAdornment: (
            <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
          ),
        }}
        sx={{ mb: 2 }}
      />

      {/* Categories */}
      <Box sx={{ display: "flex", gap: 1, mb: 3, overflowX: "auto" }}>
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.label}
            onClick={() => setActiveCategory(category.id)}
            color={activeCategory === category.id ? "primary" : "default"}
            variant={activeCategory === category.id ? "filled" : "outlined"}
          />
        ))}
      </Box>

      {/* Menu Items */}
      <Grid container spacing={2}>
        {menuItems.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Card elevation={2}>
              <CardContent>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Avatar
                    src={item.image}
                    variant="rounded"
                    sx={{ width: 80, height: 80 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Chip
                        label={item.status === "active" ? "Active" : "Inactive"}
                        color={item.status === "active" ? "success" : "default"}
                        size="small"
                      />
                    </Box>
                    <Typography variant="h6" fontWeight="bold">
                      {item.name}
                    </Typography>
                    <Typography color="text.secondary">{item.price}</Typography>
                    <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                      <IconButton size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 80,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default MenuManagement;
