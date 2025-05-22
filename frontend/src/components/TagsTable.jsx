import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Select, MenuItem, Button } from '@mui/material';
import axios from 'axios';
import Header from './Header'; // Your custom Header with search

const TagsTable = () => {
  const [tags, setTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    axios.get('http://localhost:3000/tags')
      .then(res => setTags(res.data))
      .catch(err => console.error('Error:', err));
  }, []);

  const handleDelete = (tagId) => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      axios.delete(`http://localhost:3000/tags/${tagId}`)
        .then(() => {
          setTags(tags.filter(tag => tag._id !== tagId));
        })
        .catch(err => console.error('Error deleting tag:', err));
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filteredTags = tags.filter(tag =>
    tag.tagName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTags.length / itemsPerPage);
  const paginatedTags = filteredTags.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header
        title="Tag"
        path="/tags/create"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search Tags..."
      />

      <div className="w-full mx-auto bg-white shadow-2xl rounded-xl p-6">
        <table className="w-full border border-gray-200 rounded-md overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2 text-left">S.No.</th>
              <th className="px-4 py-2 text-left">Tag Name</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTags.length > 0 ? (
              paginatedTags.map((tag, index) => (
                <tr key={tag._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="px-4 py-2 capitalize">{tag.tagName}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <Link
                        to={`/tags/view/${tag._id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition-colors"
                      >
                        View
                      </Link>
                      <Link
                        to={`/tags/edit/${tag._id}`}
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(tag._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-4 text-center text-gray-500">
                  No tags found.
                </td>
              </tr>
            )}
          </tbody>
        </table>


        <div className='flex items-center justify-end gap-4 mt-4'>
          <div>
            <label className="mr-2 font-medium">Items per page:</label>
            <Select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              size="small"
              variant="outlined"
              sx={{ minWidth: 60, backgroundColor: 'white' }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>First</Button>
            <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Prev</Button>
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
            <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</Button>
            <Button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>Last</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagsTable;
