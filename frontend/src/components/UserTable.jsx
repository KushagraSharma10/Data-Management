import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Avatar, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import Header from "./Header";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  { id: "profile", numeric: false, disablePadding: true, label: "Profile" },
  { id: "phone", numeric: false, disablePadding: false, label: "Phone" },
  {
    id: "gender",
    numeric: false,
    disablePadding: false,
    label: "Gender (M/F/O)",
  },
  {
    id: "personalDetails",
    numeric: false,
    disablePadding: false,
    label: "Personal Details",
  },
  { id: "edu", numeric: false, disablePadding: false, label: "Edu" },
];

function UserTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

UserTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function UserTableToolbar({ numSelected, selected, onDelete }) {
  const selectedUserId = selected.length > 0 ? selected[0] : null;
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!selectedUserId) return;
    
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/user/${selectedUserId}`);
      onDelete(selectedUserId); // Parent component ko notify karega
      alert("User deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete user");
    }
  };
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          User Table
        </Typography>
      )}
      {numSelected > 0 && (
        <div className="flex gap-2">
          <Link to={`/users/view/${selectedUserId}`}>
            <Button variant="contained" color="info">
              View
            </Button>
          </Link>
          <Link to={`/users/edit/${selectedUserId}`}>
            <Button variant="contained">
              Edit
            </Button>
          </Link>
          <Button 
            variant="contained" 
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      )}
    </Toolbar>
  );
}
UserTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function UserTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const[searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = React.useState(0);
  // const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/");
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  
  
  const rows = users.map((user) => ({
    id: user._id,
    profile: {
      avatar:
        user.image ||
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
      name: user.firstName + " " + (user.lastName || ""),
      email: user.email,
    },
    phone: user.phone,
    gender:user.gender,
    personalDetails: `DOB: ${formatDate(user.birthDate)}\nAge: ${user.age}\nAddress:\n${user.address.address}, ${user.address.city}`,
    edu: `University: ${user.university}`,
  }));

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const filteredRows = rows.filter((row) =>
    row.profile.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  

  const visibleRows = React.useMemo(
    () =>
      [...filteredRows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filteredRows]
  );

  return (
    <div className="p-10">
      <Header  searchQuery = {searchQuery} setSearchQuery = {setSearchQuery} title="User" path = "/user/create" />
       <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <UserTableToolbar numSelected={selected.length} selected = {selected} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <UserTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <img
                          src={row.profile.avatar}
                          alt={row.profile.name}
                          style={{ width: 40, height: 40, borderRadius: "50%" }}
                        />
                        <Box>
                          <Typography variant="body1">
                            {row.profile.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {row.profile.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">{row.gender}</TableCell>
                    <TableCell align="left">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "20vw",
                        }}
                      >
                        {row.personalDetails.split("\n").map((line, i) => (
                          <Typography key={i} variant="body2">
                            {line}
                          </Typography>
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell align="left">{row.edu}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
    </div>
   
  );
}
