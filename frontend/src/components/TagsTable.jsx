import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Button,
  Typography,
  Box
} from '@mui/material';
import { IoArrowBack } from 'react-icons/io5';
import axios from 'axios';

const TagsTable = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tags');
        setTags(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tags:', error);
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  return (
    <div className="p-6">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Tags List
        </Typography>
        <Button 
          component={Link} 
          to="/" 
          variant="contained" 
          startIcon={<IoArrowBack />}
          sx={{
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' }
          }}
        >
          Back to Dashboard
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="tags table">
          <TableHead sx={{ bgcolor: 'primary.light' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>S.No</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Tag Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  Loading tags...
                </TableCell>
              </TableRow>
            ) : tags.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No tags found
                </TableCell>
              </TableRow>
            ) : (
              tags.map((tag, index) => (
                <TableRow 
                  key={tag._id} 
                  sx={{ 
                    '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell sx={{ fontWeight: 'medium' }}>{tag.tagName}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TagsTable;