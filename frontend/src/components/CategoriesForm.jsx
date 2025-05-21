import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';

const CategoriesForm = ({ mode = 'create' }) => {
  const { categoryId } = useParams();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    if (mode !== 'create') {
      const fetchCategory = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/categories/${categoryId}`);
          setCategory(response.data);
          reset({ categoryName: response.data.categoryName });
        } catch (error) {
          console.error('Error fetching category:', error);
          navigate('/categories');
        }
      };
      fetchCategory();
    }
  }, [categoryId, mode, reset, navigate]);

  const handleFormSubmit = async (data) => {
    try {
      if (mode === 'create') {
        await axios.post('http://localhost:3000/categories', data);
      } else if (mode === 'edit') {
        await axios.put(`http://localhost:3000/categories/${categoryId}`, data);
      }
      navigate('/categories');
    } catch (error) {
      console.error(`Error ${mode === 'create' ? 'creating' : 'updating'} category:`, error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/categories/${categoryId}`);
      navigate('/categories');
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleCancel = () => {
    if (mode === 'edit') reset({ categoryName: category.categoryName });
    else navigate('/categories');
  };

  return (
    <Paper
      sx={{
        p: 6,
        maxWidth: 600,
        mx: 'auto',
        mt: 10,
        borderRadius: 4,
        boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        background: 'linear-gradient(145deg, #ffffff, #f8f9fa)'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <IconButton 
          onClick={() => navigate('/categories')}
          sx={{ 
            color: 'primary.main',
            '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.04)' }
          }}
        >
          <ArrowBack />
        </IconButton>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 700,
            color: 'primary.main',
            textTransform: 'uppercase',
            letterSpacing: 1.2
          }}
        >
          {mode === 'view' ? 'Category Details' : `${mode.charAt(0).toUpperCase() + mode.slice(1)} Category`}
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
      >
        <TextField
          fullWidth
          label="Category Name"
          variant="outlined"
          disabled={mode === 'view'}
          {...register('categoryName', { 
            required: mode !== 'view' && 'Category name is required',
            minLength: mode !== 'view' && {
              value: 2,
              message: 'Category name must be at least 2 characters'
            },
            maxLength: mode !== 'view' && {
              value: 20,
              message: 'Category name cannot exceed 20 characters'
            }
          })}
          error={!!errors.categoryName}
          helperText={errors.categoryName?.message}
          InputProps={{
            readOnly: mode === 'view',
            sx: { 
              borderRadius: 2,
              '&:focus-within': mode !== 'view' && {
                transform: 'scale(1.02)',
                transition: 'transform 0.2s ease-in-out'
              }
            }
          }}
        />

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          {mode === 'view' ? (
            <Button
              variant="contained"
              onClick={() => navigate('/categories')}
              sx={buttonStyles}
            >
              Back to List
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="outlined"
                onClick={handleCancel}
                sx={buttonStyles}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={buttonStyles}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : mode === 'edit' ? 'Update' : 'Create'}
              </Button>
              {mode === 'edit' && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setOpenDeleteDialog(true)}
                  sx={buttonStyles}
                >
                  Delete
                </Button>
              )}
            </>
          )}
        </Box>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this category? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

const buttonStyles = {
  py: 1.5,
  px: 4,
  borderRadius: 2,
  textTransform: 'uppercase',
  fontSize: '0.875rem',
  fontWeight: 600,
  letterSpacing: 1.1,
  boxShadow: 2,
  '&:hover': {
    boxShadow: 3,
    transform: 'translateY(-1px)'
  },
  '&:disabled': {
    opacity: 0.8
  }
};

export default CategoriesForm;