import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Button,
  Paper,
} from "@mui/material";
import axios from "axios";
import Header from "./Header";

const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  // const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/categories");
        setCategories(response.data);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        // setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // ✅ Filter categories
  const filteredCategories = categories.filter((cat) =>
    cat.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/categories/${id}`);
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* ✅ Pass props to Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        title="Category"
        path="/category/create"
      />

      <div className="w-full mx-auto bg-white shadow-2xl rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Categories List</h1>
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
          >
            ← Back
          </Link>
        </div>

        <table className="w-full border border-gray-200 rounded-md overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2 text-left">S.No.</th>
              <th className="px-4 py-2 text-left">Category Name</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCategories.map((cat, index) => (
              <tr key={cat._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-4 py-2 capitalize">{cat.categoryName}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <Link
                      to={`/category/view/${cat._id}`}
                      className="inline-block"
                    >
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                      >
                        View
                      </Button>
                    </Link>
                    <Link
                      to={`/category/edit/${cat._id}`}
                      className="inline-block"
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(cat._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-end gap-3">
          <div className="flex items-center justify-between">
            <div>
              <label className="mr-2 font-medium">Items per page:</label>
              <Select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                size="small"
                className="bg-white"
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="small"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              First
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </Button>

            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "contained" : "outlined"}
                size="small"
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              variant="outlined"
              size="small"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesTable;
