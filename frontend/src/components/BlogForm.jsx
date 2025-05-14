import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function BlogForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const [users, setUsers] = useState([]);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);

  const onSubmit = async (data) => {
  const formData = new FormData();

  // Append all form fields except the image
  formData.append("title", data.title);
  formData.append("author", data.author);
  formData.append("description", data.description);

  // Append image only if selected
  if (data.image && data.image[0]) {
    formData.append("image", data.image[0]);
  }

  try {
    await axios.post("http://localhost:3000/blogs", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    alert("Blog submitted successfully!");
    reset();         // Clear form fields
    
    setPreview(null); // Clear image preview
  } catch (err) {
    console.error("Submission failed:", err);
  }

  console.log("Form Data:", data); // Debug original form data
};


const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setValue("image", [file]); // ✅ Wrap in array
    setPreview(URL.createObjectURL(file));
  }
};


  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 5, borderRadius: "1vw", border:"none" , boxShadow:"" }}>
      <Typography variant="h5" mb={4} fontWeight={500} textAlign={"center"} >
        Create Blog
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Button variant="outlined" component="label">
          Upload Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </Button>
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        )}

        <TextField
          label="Title"
          {...register("title", { required: "Title is required" })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        <TextField
          label="Description"
          multiline
          rows={4}
          {...register("description", {
            required: "Description is required",
          })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <TextField
          select
          label="Author"
          defaultValue=""
          {...register("author", { required: "Author is required" })}
          error={!!errors.author}
          helperText={errors.author?.message}
        >
          {users.map((user) => (
            <MenuItem key={user._id} value={user.fullName}>
              {user.fullName}
            </MenuItem>
          ))}
        </TextField>

        <Button variant="contained" type="submit">
          Submit Blog
        </Button>
      </Box>
    </Paper>
  );
}
