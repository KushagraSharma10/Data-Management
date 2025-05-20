// BlogTable.jsx
import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  Popover,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormGroup,
  CircularProgress,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import { Link } from "react-router"; // Corrected from 'react-router'
import { useEffect } from "react";
import Header from "./Header";
import { IoFilter } from "react-icons/io5";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  { id: "sno", label: "S.No" },
  { id: "title", label: "Title" },
  { id: "description", label: "Description" },
  { id: "author", label: "Author" },
  { id: "category", label: "Category" }, // ➕ added
  { id: "tags", label: "Tags" }, // ➕ added
  { id: "createdAt", label: "Created At" },
  { id: "updatedAt", label: "Updated At" },
  { id: "actions", label: "Actions" },
];

function BlogTableHead(props) {
  const {
    order,
    orderBy,
    onRequestSort,
    numSelected,
    rowCount,
    onSelectAllClick,
  } = props;

  const createSortHandler = (property) => (event) =>
    onRequestSort(event, property);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all blogs" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id && (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

BlogTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  numSelected: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
};

function BlogTableToolbar({ selected, handleFilterClick }) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selected.length > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <div className="flex items-center justify-between w-full px-3">
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Blogs
        </Typography>
        <IoFilter
          className="text-2xl cursor-pointer"
          onClick={handleFilterClick}
        />
      </div>
    </Toolbar>
  );
}

BlogTableToolbar.propTypes = {
  selected: PropTypes.array.isRequired,
  handleFilterClick: PropTypes.func.isRequired,
};

export default function BlogTable({ searchQuery = "" }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("createdAt");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [blogs, setBlogs] = React.useState([]);
  const [filterAnchorEl, setFilterAnchorEl] = React.useState(null);
  const [allTags, setAllTags] = React.useState([]);
  const [allCategories, setAllCategories] = React.useState([]);
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const open = Boolean(filterAnchorEl);
  const id = open ? "filter-popover" : undefined;

  const handleTagChange = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
    setSelectedCategory("");
  };

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [tagsRes, categoryRes] = await Promise.all([
          axios.get("http://localhost:3000/tags"),
          axios.get("http://localhost:3000/categories"),
        ]);
        setAllTags(tagsRes.data);
        setAllCategories(categoryRes.data);
      } catch (err) {
        console.error("Failed to fetch tags or categories:", err);
      }
    };
    fetchFilters();
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = visibleRows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else if (selectedIndex === 0) {
      newSelected = selected.slice(1);
    } else if (selectedIndex === selected.length - 1) {
      newSelected = selected.slice(0, -1);
    } else if (selectedIndex > 0) {
      newSelected = [
        ...selected.slice(0, selectedIndex),
        ...selected.slice(selectedIndex + 1),
      ];
    }

    setSelected(newSelected);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  // const filteredRows = blogs
  // .filter((blog) =>
  //   blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  // )
  // .map((blog, index) => ({
  //   sno: page * rowsPerPage + index + 1, // ✅ fix S.No
  //   id: blog._id,
  //   title: blog.title,
  //   description: blog.description,
  //   author: blog.author,
  //   createdAt: new Date(blog.createdAt).toLocaleDateString(),
  //   updatedAt: new Date(blog.updatedAt).toLocaleDateString(),
  // }));

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      [...blogs]
        .filter((blog) => {
          const matchesTitle = blog.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          const matchesCategory =
            !selectedCategory || blog.category === selectedCategory;
          const blogTags = (() => {
            try {
              return JSON.parse(blog.tags);
            } catch {
              return [];
            }
          })();
          const matchesTags =
            selectedTags.length === 0 ||
            selectedTags.every((tag) => blogTags.includes(tag));
          return matchesTitle && matchesCategory && matchesTags;
        })
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((blog, index) => ({
          sno: page * rowsPerPage + index + 1,
          id: blog._id,
          title: blog.title,
          description: blog.description,
          author: blog.author,
          category: blog.category, // ➕ added
          tags: (() => {
            try {
              return JSON.parse(blog.tags);
            } catch {
              return [];
            }
          })(),
          createdAt: new Date(blog.createdAt).toLocaleDateString("en-GB"), // formatted
          updatedAt: new Date(blog.updatedAt).toLocaleDateString("en-GB"),
        })),
    [blogs, order, orderBy, page, rowsPerPage, searchQuery]
  );

  const totalFiltered = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirm) return;

    try {
      const response = await axios.delete(`http://localhost:3000/blogs/${id}`);

      if (response.status === 200) {
        const newSelected = selected.filter((item) => item !== id);
        setSelected(newSelected);
        setBlogs(blogs.filter((blog) => blog._id !== id));
      } else {
        console.error("Delete failed:", response.data.message);
      }
    } catch (error) {
      console.error(
        "Error deleting blog:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="py-10 px-4">
      <Popover
        id={id}
        open={open}
        anchorEl={filterAnchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ p: 2, width: 250 }}>
          <Typography variant="subtitle1">Filter By Category</Typography>
          <FormControl component="fieldset">
            <RadioGroup
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {allCategories.map((cat) => (
                <FormControlLabel
                  key={cat._id}
                  value={cat.name}
                  control={<Radio />}
                  label={cat.name}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Filter By Tags
          </Typography>
          <FormGroup>
            {allTags.length === 0 ? (
              <CircularProgress size={20} />
            ) : (
              allTags.map((tag) => (
                <FormControlLabel
                  key={tag._id}
                  control={
                    <Checkbox
                      checked={selectedTags.includes(tag.name)}
                      onChange={() => handleTagChange(tag.name)}
                    />
                  }
                  label={tag.tagName}
                />
              ))
            )}
          </FormGroup>

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button size="small" onClick={handleClearFilters}>
              Clear
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={handleFilterClose}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Popover>

      <Header title="Blog" path="/blogs/create" />
      <Box className="p-2 rounded-xl" sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <BlogTableToolbar
            selected={selected}
            handleFilterClick={handleFilterClick}
          />
          <TableContainer>
            <Table sx={{ minWidth: 750 }}>
              <BlogTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                numSelected={selected.length}
                rowCount={visibleRows.length}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {visibleRows.map((row) => (
                  <TableRow
                    hover
                    key={row.id}
                    role="checkbox"
                    aria-checked={isSelected(row.id)}
                    selected={isSelected(row.id)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected(row.id)}
                        onChange={() => handleClick(row.id)}
                      />
                    </TableCell>
                    <TableCell>{row.sno}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.author}</TableCell>
                    <TableCell>{row.category}</TableCell>{" "}
                    {/* ➕ category cell */}
                    <TableCell>
                      {row.tags.length ? row.tags.join(", ") : "—"}
                    </TableCell>{" "}
                    {/* ➕ tags cell */}
                    <TableCell>{row.createdAt}</TableCell>
                    <TableCell>{row.updatedAt}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Link to={`/blogs/view/${row.id}`}>
                          <Button variant="outlined" size="small">
                            View
                          </Button>
                        </Link>
                        <Link to={`/blogs/edit/${row.id}`}>
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                          >
                            Update
                          </Button>
                        </Link>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleDelete(row.id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {visibleRows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No blogs found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalFiltered.length}
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
