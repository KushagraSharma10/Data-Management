import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";
import axios from "axios";

export default function BlogForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    image: null,
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/") // your user API
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("User fetch failed:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      data.append(key, value)
    );

    try {
      await axios.post("http://localhost:3000/blogs", data); // Adjust your blog API
      alert("Blog submitted successfully!");
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4, borderRadius: "1vw" }}>
      <Typography variant="h5" gutterBottom>
        Create Blog
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
      <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
          Upload Image

          <input
            type="file"
            name="image"
            hidden
            accept="image/*"
            onChange={handleChange}
          />
            {formData.image && (
                <img
                src={URL.createObjectURL(formData.image)}
                alt="Preview"
                style={{ width: "100px", height: "100px", marginLeft: "10px" }}
                />

            )}
        </Button>
        <TextField
          fullWidth
          label="Title"
          name="title"
          margin="normal"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          name="description"
          margin="normal"
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          select
          label="Author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          margin="normal"
        >
          {users.map((user) => (
            <MenuItem key={user._id} value={user.fullName}>
              {user.fullName}
            </MenuItem>
          ))}
        </TextField>
      
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          Submit
        </Button>
      </Box>
    </Paper>
  );
}

