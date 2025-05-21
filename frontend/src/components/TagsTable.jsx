import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Select, MenuItem, Button
} from '@mui/material';
import axios from 'axios';
import Header from './Header';

const TagsTable = () => {
  const [tags, setTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    axios.get('http://localhost:3000/tags')
      .then(res => setTags(res.data))
      .catch(err => console.error('Error:', err));
  }, []);

  const totalPages = Math.ceil(tags.length / itemsPerPage);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedTags = tags.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header title="Tags" path="/tags/create" />
      <div className="w-full mx-auto bg-white shadow-2xl rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Tags List</h1>
          <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
            ← Back
          </Link>
        </div>
      
        {/* Table */}
        <table className="w-full border border-gray-200 rounded-md overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2 text-left">S.No.</th>
              <th className="px-4 py-2 text-left">Tag Name</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTags.map((tag, index) => (
              <tr key={tag._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="px-4 py-2 capitalize">{tag.tagName}</td>
              </tr>
            ))}
          </tbody>
        </table>

       <div className='flex items-center justify-end gap-4 mt-4'>
        <div className="flex items-center justify-between ">
          <div>
            <label className="mr-2 font-medium">Items per page:</label>
            <Select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              size="small"
              variant="outlined"
              sx={{ minWidth: 60, backgroundColor: 'white' }}
              className="bg-white"
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
            </Select>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center">
          <div />
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

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? 'contained' : 'outlined'}
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
    </div>
  );
};

export default TagsTable;
