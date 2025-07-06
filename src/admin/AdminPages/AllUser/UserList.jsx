import React, { useCallback, useState, useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  InputAdornment,
  Container,
  useTheme,
  useMediaQuery,
  Chip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Search as SearchIcon, Warning } from "@mui/icons-material";
import { Nav } from "../Components/LeftSlid/Nav";
import "./UserList.css";
import axios from "axios";
import { ADMIN_BASE_URL } from "../../../utils/baseUrl";

import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserCard from "../SingleUser/User";
const columns = [
  { id: "fullname", label: "Full Name ", minWidth: 170, align: "center" },
  { id: "email", label: "Email", minWidth: 200, align: "center" },
  {
    id: "mobile",
    label: "Mobile",
    minWidth: 120,
    align: "center",
  },
  {
    id: "updatedAt",
    label: "Updated At",
    minWidth: 180,
    align: "center",
  },
  {
    id: "createdAt",
    label: "Created At",
    minWidth: 180,
    align: "center",
  },
];

export default function UserList() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [users, setUsers] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const navigate = useNavigate();
  const [debouncedSearchItem, setDebouncedSearchItem] = useState("");
  const [openuserDetails, setOpenUserDetails] = useState(false);
  const [selectedUser, setselectedUser] = useState(null);

  //  debouncer for delay response (Reduces rendering and performance issues)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchItem(searchItem);
    }, 400); // delay time (ms)

    return () => clearTimeout(handler); // clear on each keystroke
  }, [searchItem]);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${ADMIN_BASE_URL}/allusers`, {
        params: {
          pageNumber: page + 1,
          pageSize: rowsPerPage,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      });
      if (res.status == 200) {
        setUsers(res.data.data || []);
        setTotalUsers(res.data.total || res.data.data.length);
      }
    } catch (error) {
      if (error.response.status == 401) {
        toast.error(error.response.data.message);
        navigate("/lakhdatar/admin/login");
      }
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const filteredUsers = users.filter((user) =>
    user.fullname?.toLowerCase().includes(debouncedSearchItem.toLowerCase())
  );

  const handlesingleUserDetails = (e, user) => {
    e.preventDefault();
    setOpenUserDetails(true);
    setselectedUser(user);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Nav activeIndex={2} />
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
              variant="outlined"
              placeholder="Search by name..."
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: isSmallScreen ? "100%" : 400 }}
            />
          </Box>

          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 500, minHeight: "78vh" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {columns.map((col) => (
                      <TableCell
                        key={col.id}
                        align={col.align || "left"}
                        style={{ minWidth: col.minWidth, fontWeight: "bold" }}
                      >
                        {col.label}
                      </TableCell>
                    ))}
                    <TableCell style={{ minWidth: 80, fontWeight: "bold" }}>
                      Status
                    </TableCell>
                    <TableCell style={{ minWidth: 80, fontWeight: "bold" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(searchItem ? filteredUsers : users).length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={columns.length + 3} align="center">
                        No users found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    (searchItem ? filteredUsers : users).map((user) => (
                      <TableRow hover key={user._id}>
                        {columns.map((col) => (
                          <TableCell key={col.id} align={col.align || "left"}>
                            {col.id === "createdAt" || col.id === "updatedAt"
                              ? new Date(user[col.id]).toLocaleString()
                              : user[col.id]}
                          </TableCell>
                        ))}

                        <TableCell>
                          <Chip
                            label={
                              user.status === 1
                                ? "Active"
                                : user.status === 0
                                ? "Inactive"
                                : "Deleted"
                            }
                            color={
                              user.status === 1
                                ? "success"
                                : user.status === 0
                                ? "warning"
                                : "error"
                            }
                            size="small"
                          />
                        </TableCell>

                        <TableCell>
                          <Button
                            variant="contained"
                            sx={{ backgroundColor: "rgb(25, 118, 210)" }}
                            onClick={(e) => handlesingleUserDetails(e, user)}
                          >
                            view
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={searchItem ? filteredUsers.length : totalUsers}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[10, 25, 100]}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                minHeight: "64px",
                "& .MuiTablePagination-toolbar": {
                  padding: "0 16px",
                  minHeight: "64px",
                },
                "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                  {
                    color: "rgb(25, 118, 210)",
                  },
                "& .MuiSelect-select": {
                  color: "white",
                  backgroundColor: "rgb(25, 118, 210)",
                  borderRadius: "6px",
                  padding: "6px 12px",
                },
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              }}
              slotProps={{
                select: {
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        bgcolor: "rgb(25, 118, 210)",
                        color: "white",
                      },
                    },
                  },
                },
              }}
            />
          </Paper>
        </Container>
      </Box>
      {openuserDetails && (
        <UserCard user={selectedUser} setOpenUserDetails={setOpenUserDetails} />
      )}
    </Box>
  );
}
