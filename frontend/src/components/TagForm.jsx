import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  IconButton
} from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';

const TagForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:3000/tags', {
        tagName: data.tagName
      });
      navigate('/tags');
    } catch (error) {
      console.error('Error creating tag:', error);
    }
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
          onClick={() => navigate('/tags')}
          sx={{ 
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.04)'
            }
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
          Create New Tag
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
      >
        <TextField
          fullWidth
          label="Tag Name"
          variant="outlined"
          {...register('tagName', { 
            required: 'Tag name is required',
            minLength: {
              value: 2,
              message: 'Tag name must be at least 2 characters'
            },
            maxLength: {
              value: 20,
              message: 'Tag name cannot exceed 20 characters'
            }
          })}
          error={!!errors.tagName}
          helperText={errors.tagName?.message}
          InputProps={{
            sx: { 
              borderRadius: 2,
              '&:focus-within': {
                transform: 'scale(1.02)',
                transition: 'transform 0.2s ease-in-out'
              }
            }
          }}
          InputLabelProps={{
            sx: {
              color: 'text.secondary',
            }
          }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
          sx={{
            py: 1.5,
            borderRadius: 2,
            textTransform: 'uppercase',
            fontSize: '1rem',
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
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Create Tag'
          )}
        </Button>
      </Box>
    </Paper>
  );
};

export default TagForm;