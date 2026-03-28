import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AddPaymentPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ amount: "", description: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Payment added (demo)!");
    navigate("/payments/list");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <TextField fullWidth name="amount" label="Amount" value={formData.amount} onChange={handleChange} margin="normal" required />
      <TextField fullWidth name="description" label="Description" value={formData.description} onChange={handleChange} margin="normal" />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>Add Payment</Button>
    </Box>
  );
}