import React, { useState } from "react";
import axios from "axios";
import { Typography, Box, TextField, Button } from "@mui/material";

function AddDNSRecord() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    data: "",
    ttl: 3600, // Optional, can be set or left empty
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure the URL matches the Express route
      const response = await axios.post(
        "http://localhost:3000/api/records",
        formData
      ); // Adjust this based on your server setup
      setMessage("DNS record added successfully!");
      setFormData({ name: "", type: "", data: "", ttl: 3600 });
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add DNS record");
    }
  };

  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h4" component="h2" gutterBottom>
        Add New DNS Record
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Add a new DNS record for your domain.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mt={2}>
          <TextField
            label="Domain Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Type (A, CNAME, etc.)"
            name="type"
            value={formData.type}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Record Data"
            name="data"
            value={formData.data}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="TTL (seconds)"
            name="ttl"
            value={formData.ttl}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Add Record
          </Button>
        </Box>
      </form>
      {message && (
        <Typography variant="body2" color="textSecondary" mt={2}>
          {message}
        </Typography>
      )}
    </Box>
  );
}

export default AddDNSRecord;
