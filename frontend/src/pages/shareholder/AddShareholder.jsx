import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addShareholder } from "../../api/shareholderApi"; // your API call

export default function AddShareholderPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    // Add other fields
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addShareholder(formData); // call your backend API
      alert("Shareholder added successfully!");
      navigate("/shareholders/list"); // go back to list
    } catch (err) {
      console.error(err);
      alert("Error adding shareholder");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        margin="normal"
      />
      {/* Add more fields as needed */}
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Add Shareholder
      </Button>
    </Box>
  );
}