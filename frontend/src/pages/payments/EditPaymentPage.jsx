import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Stack,
  Typography,
  IconButton,
  Autocomplete
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function EditPaymentPage() {
  const { id } = useParams(); // Payment ID from URL
  const navigate = useNavigate();

  const [shareholders, setShareholders] = useState([]);
  const [formData, setFormData] = useState({
    shareholder: null,
    kistiType: "",
    paymentType: "",
    paymentDate: null,
    amount: "",
    comment: ""
  });
  const [errors, setErrors] = useState({});

  // Load shareholders and payment data
  useEffect(() => {
    // 1️⃣ Load all shareholders
    axios.get("http://localhost:6060/api/shareholders", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => setShareholders(res.data))
      .catch(err => console.error("Error fetching shareholders:", err));

    // 2️⃣ Load payment data by ID
    axios.get(`http://localhost:6060/api/payments/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => {
        const p = res.data;
        setFormData({
          shareholder: p.shareholder,
          kistiType: p.kistiType,
          paymentType: p.type,
          paymentDate: p.paymentDate ? dayjs(p.paymentDate) : null,
          amount: p.amount,
          comment: p.comment
        });
      })
      .catch(err => console.error("Error fetching payment:", err));
  }, [id]);

  // Handle input changes
  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "amount" && !/^\d*\.?\d*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // Handle shareholder selection
  const handleShareholderChange = (event, value) => {
    setFormData({ ...formData, shareholder: value });
    setErrors({ ...errors, shareholder: "" });
  };

  // Simple validation
  const validate = () => {
    const newErrors = {};
    if (!formData.shareholder) newErrors.shareholder = "Shareholder is required";
    if (!formData.paymentType) newErrors.paymentType = "Payment type is required";
    if (!formData.amount) newErrors.amount = "Amount is required";
    else if (parseFloat(formData.amount) <= 0) newErrors.amount = "Amount must be greater than 0";
    if (formData.comment && formData.comment.length > 200) newErrors.comment = "Comment too long (max 200 chars)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit update
  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      shareholder: formData.shareholder,
      kistiType: formData.kistiType,
      type: formData.paymentType,
      paymentDate: formData.paymentDate ? formData.paymentDate.format("YYYY-MM-DD") : null,
      amount: parseFloat(formData.amount),
      comment: formData.comment
    };

    axios.put(`http://localhost:6060/api/payments/${id}`, payload, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(() => {
        alert("Payment updated successfully!");
        navigate("/payments/list");
      })
      .catch(err => {
        console.error("Error updating payment:", err);
        alert("Error updating payment");
      });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBack />
        </IconButton>
        <Typography variant="h5">Edit Payment</Typography>
      </Stack>

      <Box component="form" onSubmit={handleSubmit}>
        {/* Shareholder */}
        <Autocomplete
          options={shareholders}
          getOptionLabel={o => `${o.name} (NID: ${o.nid || "N/A"}, Phone: ${o.contactNo || "N/A"})`}
          value={formData.shareholder}
          onChange={handleShareholderChange}
          renderInput={params => (
            <TextField {...params} label="Select Shareholder" required margin="normal" error={!!errors.shareholder} helperText={errors.shareholder} />
          )}
        />

        {/* Kisti Type */}
        <TextField
          select
          fullWidth
          name="kistiType"
          label="Select Kisti Type"
          value={formData.kistiType}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value="monthly_kisti">মাসিক কিস্তি</MenuItem>
          <MenuItem value="yearly_kisti1">বার্ষিক-১</MenuItem>
          <MenuItem value="yearly_kisti2">বার্ষিক-২</MenuItem>
          <MenuItem value="oneTime_kisti1">এককালীন-১</MenuItem>
          <MenuItem value="oneTime_kisti2">এককালীন-২</MenuItem>
          <MenuItem value="oneTime_kisti3">এককালীন-৩</MenuItem>
        </TextField>

        {/* Payment Date */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Payment Date"
            value={formData.paymentDate}
            onChange={newValue => setFormData({ ...formData, paymentDate: newValue })}
            renderInput={params => <TextField {...params} fullWidth margin="normal" />}
          />
        </LocalizationProvider>

        {/* Payment Method */}
        <TextField
          select
          fullWidth
          name="paymentType"
          label="Select Payment Method"
          value={formData.paymentType}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value="BANK">Bank</MenuItem>
          <MenuItem value="BKASH">Bkash</MenuItem>
          <MenuItem value="HANDCASH">Handcash</MenuItem>
        </TextField>

        {/* Amount */}
        <TextField
          fullWidth
          name="amount"
          label="Amount"
          value={formData.amount}
          onChange={handleChange}
          margin="normal"
        />

        {/* Comment */}
        <TextField
          fullWidth
          name="comment"
          label="Comment"
          value={formData.comment}
          onChange={handleChange}
          margin="normal"
        />

        <Button type="submit" variant="contained" sx={{ mt: 3 }}>
          Update Payment
        </Button>
      </Box>
    </Box>
  );
}