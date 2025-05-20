import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { IoArrowBack } from 'react-icons/io5';
import axios from 'axios';

const TagsTable = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/tags')
      .then(res => setTags(res.data))
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Tags List</h1>
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
              <th className="px-4 py-2 text-left">Tag Name</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag, index) => (
              <tr key={tag._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 capitalize">{tag.tagName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default TagsTable;