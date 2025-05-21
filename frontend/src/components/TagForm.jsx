import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  IconButton,
  Stack
} from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';

const TagForm = () => {
  const { tagId } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const isViewMode = location.pathname.startsWith('/tags/view/');
  const isEditMode = location.pathname.startsWith('/tags/edit/');
  const mode = isViewMode ? 'view' : isEditMode ? 'edit' : 'create';

  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (mode !== 'create') {
      const fetchTag = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`http://localhost:3000/tags/${tagId}`);
          setValue('tagName', response.data.tagName);
        } catch (error) {
          console.error('Error fetching tag:', error);
          navigate('/tags');
        } finally {
          setIsLoading(false);
        }
      };
      fetchTag();
    }
  }, [mode, tagId, setValue, navigate]);

  const onSubmit = async (data) => {
    try {
      if (mode === 'edit') {
        await axios.put(`http://localhost:3000/tags/${tagId}`, {
          tagName: data.tagName
        });
      } else if (mode === 'create') {
        await axios.post('http://localhost:3000/tags', {
          tagName: data.tagName
        });
      }
      navigate('/tags');
    } catch (error) {
      console.error('Error saving tag:', error);
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
          {mode === 'view' && 'View Tag Details'}
          {mode === 'edit' && 'Edit Tag'}
          {mode === 'create' && 'Create New Tag'}
        </Typography>
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
        >
          <TextField
            fullWidth
            label="Tag Name"
            variant="outlined"
            disabled={mode === 'view'}
            InputProps={{
              readOnly: mode === 'view',
              sx: { 
                borderRadius: 2,
                ...(mode !== 'view' && {
                  '&:focus-within': {
                    transform: 'scale(1.02)',
                    transition: 'transform 0.2s ease-in-out'
                  }
                })
              }
            }}
            {...register('tagName')}
            error={mode !== 'view' && !!errors.tagName}
            helperText={mode !== 'view' ? errors.tagName?.message : ''}
            InputLabelProps={{
              sx: { color: 'text.secondary' }
            }}
          />

          <Stack direction="row" spacing={2}>
            {mode === 'view' ? (
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate('/tags')}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'uppercase',
                  fontSize: '1rem',
                  fontWeight: 600,
                  letterSpacing: 1.1,
                  boxShadow: 2,
                  '&:hover': { boxShadow: 3 }
                }}
              >
                Back to List
              </Button>
            ) : mode === 'edit' ? (
              <>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'uppercase',
                    fontSize: '1rem',
                    fontWeight: 600,
                    letterSpacing: 1.1,
                    boxShadow: 2,
                    '&:hover': { boxShadow: 3 }
                  }}
                >
                  {isSubmitting ? <CircularProgress size={24} /> : 'Update'}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/tags')}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'uppercase',
                    fontSize: '1rem',
                    fontWeight: 600,
                    letterSpacing: 1.1
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'uppercase',
                  fontSize: '1rem',
                  fontWeight: 600,
                  letterSpacing: 1.1,
                  boxShadow: 2,
                  '&:hover': { boxShadow: 3 }
                }}
              >
                {isSubmitting ? <CircularProgress size={24} /> : 'Create Tag'}
              </Button>
            )}
          </Stack>
        </Box>
      )}
    </Paper>
  );
};

export default TagForm;