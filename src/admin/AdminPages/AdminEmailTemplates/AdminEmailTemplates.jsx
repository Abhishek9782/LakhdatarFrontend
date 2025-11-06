import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  Paper,
  TextField,
  useMediaQuery,
  useTheme,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { Nav } from "../Components/LeftSlid/Nav";
import { fetchAllEmailTemplates } from "../../../services/authService";
import AdminTemplateUpdate from "../AdminEmailUpdate/AdminTemplateUpdate";
import { jwtDecode } from "jwt-decode";

const AdminEmailTemplates = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchItem, setSearchItem] = useState("");
  const [templates, setTemplates] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isupdateTemplate, setIsupdateTemplate] = useState(false);
  const [currentEmailTempValue, setcurrentEmailTempValue] = useState(null);
  const [filteredTemplates, setFilteredTemplates] = useState([]);

  const fetchTemplates = async () => {
    try {
      let params = { pageNumber: pageNumber, pageSize: pageSize };
      const res = await fetchAllEmailTemplates(params);
      if (res.status) {
        setTemplates(res.data);
        setFilteredTemplates(res.data);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchItem(keyword);

    const filtered = templates.filter((tpl) =>
      tpl.title.toLowerCase().includes(keyword)
    );
    setFilteredTemplates(filtered);
  };

  const EmailtemplateValue = (e, value) => {
    e.preventDefault();
    setIsupdateTemplate(true);
    setcurrentEmailTempValue(value);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Nav activeIndex={3} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: theme.palette.background.default,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container maxWidth="xl">
          {/* 🔍 Search + ➕ Add */}
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
            <TextField
              fullWidth
              size="small"
              placeholder="Search Templates..."
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
                  <IconButton onClick={() => setSearchItem("")}>
                    <ClearIcon />
                  </IconButton>
                ),
              }}
              sx={{
                width: "35%",
                backgroundColor: theme.palette.background.paper,
              }}
            />

            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => console.log("Open Add Template Modal")}
              sx={{
                ml: isSmallScreen ? 0 : 2,
                width: "18%",
              }}
            >
              Add Template
            </Button>
          </Box>

          {/* 📋 Email Template List */}
          {filteredTemplates.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No templates found.
            </Typography>
          ) : (
            filteredTemplates.map((tpl) => (
              <Paper
                key={tpl._id}
                sx={{
                  p: 2,
                  mb: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Box>
                  <Typography variant="subtitle1">{tpl.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tpl.subject}
                  </Typography>
                </Box>

                <Button
                  variant="outlined"
                  onClick={(e) => EmailtemplateValue(e, tpl)}
                >
                  Edit
                </Button>
              </Paper>
            ))
          )}
          {isupdateTemplate && (
            <AdminTemplateUpdate
              value={currentEmailTempValue}
              close={setIsupdateTemplate}
            />
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default AdminEmailTemplates;
