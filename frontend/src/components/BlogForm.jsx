import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { ArrowBack, PhotoCamera, Send } from "@mui/icons-material";
import { Link, useParams } from "react-router";

export default function BlogForm({ mode = "create" }) {
  const { blogId } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const [users, setUsers] = useState([]);
  const [preview, setPreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const isReadOnly = mode === "view";

  useEffect(() => {
    axios.get("http://localhost:3000/").then((res) => setUsers(res.data));
    axios.get("http://localhost:3000/tags").then((res) => setTags(res.data));
    axios
      .get("http://localhost:3000/categories")
      .then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && blogId) {
      axios.get(`http://localhost:3000/blogs/${blogId}`).then((res) => {
        const { title, description, author, image, category, tags } = res.data;
        setValue("title", title);
        setValue("description", description);
        setValue("author", author);
        setValue("category", category);     // ✅ Important
        setValue("tags", tags || []); 
        setPreview(image);
      });
    }
  }, [mode, blogId, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("tags", JSON.stringify(data.tags));
    if (data.image && data.image[0]) formData.append("image", data.image[0]);

    try {
      if (mode === "edit") {
        await axios.put(`http://localhost:3000/blogs/${blogId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Blog updated successfully!");
      } else {
        await axios.post("http://localhost:3000/blogs", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Blog created successfully!");
      }
      reset();
      setPreview(null);
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("image", [file]);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Paper
      sx={{
        p: 6,
        maxWidth: 800,
        mx: "auto",
        mt: 8,
        borderRadius: 4,
        boxShadow: "0px 15px 35px rgba(0,0,0,0.1)",
        background:
          "linear-gradient(to bottom right, #f9fafb 0%, #f3f4f6 100%)",
        position: "relative",
      }}
    >
      {/* Back Button */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 1,
        }}
      >
        <Button
          component={Link}
          to="/blogs"
          startIcon={<ArrowBack />}
          sx={{
            textTransform: "none",
            color: "text.secondary",
            "&:hover": {
              color: "primary.main",
              bgcolor: "rgba(63,81,181,0.08)",
            },
            transition: "all 0.2s ease",
            borderRadius: 2,
            px: 2,
            py: 1,
          }}
        >
          Back to Blogs
        </Button>
      </Box>

      <Typography
        variant="h4"
        mb={5}
        fontWeight={600}
        textAlign="center"
        sx={{
          color: "text.primary",
          letterSpacing: 1,
          "&:after": {
            content: '""',
            display: "block",
            width: "60px",
            height: "4px",
            background: "#3f51b5",
            margin: "16px auto 0",
            borderRadius: 2,
          },
        }}
      >
        {mode === "edit"
          ? "Edit Blog"
          : mode === "view"
          ? "View Blog"
          : "Create New Blog"}
      </Typography>
      <Box
        component="form"
        onSubmit={!isReadOnly ? handleSubmit(onSubmit) : undefined}
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        {!isReadOnly && (
          <Button
            variant="contained"
            component="label"
            startIcon={<PhotoCamera />}
            sx={{
              py: 1.5,
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
              fontSize: 16,
              textTransform: "none",
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            Upload Featured Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
        )}

        {preview && (
          <div className="w-full flex items-center justify-center">
            <Box
              sx={{
                position: "relative",
                width: "15vw",
                height: "15vw",
                borderRadius: "100%",
                overflow: "hidden",
                boxShadow: 3,
                mt: 1,
                mb: 2,
              }}
            >
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </div>
        )}

        <TextField
          label="Blog Title"
          variant="outlined"
          fullWidth
          {...register("title", { required: "Title is required" })}
          error={!!errors.title}
          helperText={errors.title?.message}
          disabled={isReadOnly}
          InputLabelProps={{
            shrink: !!watch("title") || isReadOnly, // This ensures label shrinks when field has a value or in view mode
          }}
          placeholder={!isReadOnly ? "Enter the blog title" : ""}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
              },
            },
          }}
          InputProps={{
            style: { fontSize: 18 },
          }}
        />

        <TextField
          label="Blog Content"
          multiline
          rows={6}
          variant="outlined"
          {...register("description", { required: "Description is required" })}
          error={!!errors.description}
          helperText={errors.description?.message}
          disabled={isReadOnly}
          InputLabelProps={{
            shrink: !!watch("description") || isReadOnly,
          }}
          placeholder={!isReadOnly ? "Enter blog content" : ""}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "& textarea": { fontSize: 16 },
            },
          }}
        />

        {/* <TextField
          select
          label="Select Author"
          defaultValue=""
          variant="outlined"
          {...register(
            "author",
            mode === "create" ? { required: "Author is required" } : {}
          )}
          error={!!errors.author}
          helperText={errors.author?.message}
          disabled={isReadOnly || mode === "edit"}
          InputLabelProps={{
            shrink: !!watch("author") || isReadOnly,
          }}
          placeholder={!isReadOnly ? "Choose author" : ""}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
              },
            },
          }}
          InputProps={{
            style: { fontSize: 16 },
          }}
        >
          {users.map((user) => (
            <MenuItem
              key={user._id}
              value={user.firstName}
              sx={{
                fontSize: 15,
                "&:hover": { bgcolor: "primary.light" },
                "&.Mui-selected": { bgcolor: "primary.main", color: "white" },
              }}
            >
              {user.firstName} {user.lastName}
            </MenuItem>
          ))}
        </TextField> */}

<Controller
  name="author"
  control={control}
  rules={{ required: "Author is required" }}
  render={({ field }) => (
    <TextField
      select
      label="Select Author"
      fullWidth
      {...field}
      error={!!errors.author}
      helperText={errors.author?.message}
      disabled={isReadOnly || mode === "edit"}
    >
      {users.map((user) => (
        <MenuItem key={user._id} value={user.firstName}>
          {user.firstName} {user.lastName}
        </MenuItem>
      ))}
    </TextField>
  )}
/>


        {/* Category - Single Select */}
        <Controller
  name="category"
  control={control}
  rules={{ required: "Category is required" }}
  render={({ field }) => (
    <TextField
      select
      label="Select Category"
      fullWidth
      {...field}
      error={!!errors.category}
      helperText={errors.category?.message}
      disabled={isReadOnly}
      InputLabelProps={{
        shrink: !!field.value, // ✅ Yeh line fix karega
      }}

    >
      {categories.map((cat) => (
        <MenuItem key={cat._id} value={cat.categoryName}>
          {cat.categoryName}
        </MenuItem>
      ))}
    </TextField>
  )}
/>


        {/* Tags - Multi Select */}
        <Controller
  name="tags"
  control={control}
  rules={{ required: "At least one tag is required" }}
  InputLabelProps={{
    shrink: true,
  }}
  render={({ field }) => (
    <TextField
      select
      label="Select Tags"
      defaultValue={[]}
      fullWidth
      SelectProps={{ multiple: true }}
      {...field}
      error={!!errors.tags}
      helperText={errors.tags?.message}
      disabled={isReadOnly}
    >
      {tags.map((tag) => (
        <MenuItem key={tag._id} value={tag.tagName}>
          {tag.tagName}
        </MenuItem>
      ))}
    </TextField>
  )}
/>


        {!isReadOnly && (
          <Button
            variant="contained"
            type="submit"
            endIcon={<Send />}
            sx={{
              mt: 3,
              py: 1.5,
              fontSize: 17,
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 2,
              bgcolor: mode === "edit" ? "warning.main" : "success.main",
              "&:hover": {
                bgcolor: mode === "edit" ? "warning.dark" : "success.dark",
                transform: "translateY(-2px)",
                boxShadow: 3,
              },
              transition: "all 0.2s ease",
            }}
          >
            {mode === "edit" ? "Update Blog" : "Publish Blog"}
          </Button>
        )}

        {isReadOnly && (
          <Typography
            variant="body1"
            sx={{
              mt: 3,
              fontSize: 16,
              color: "text.secondary",
              textAlign: "center",
            }}
          >
            This is a read-only view of the blog.
          </Typography>
        )}
      </Box>
    </Paper>
  );
}
