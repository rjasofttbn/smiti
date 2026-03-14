// src/pages/login/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper
} from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:6060/api/auth/login", {
        username,
        password
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",           // full screen height
        display: "flex",            // flex layout
        justifyContent: "center",   // center horizontally
        alignItems: "center",       // center vertically
        backgroundColor: "#f5f5f5" // light background
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          width: { xs: "90%", sm: 400 }, // responsive width
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Typography variant="h4" mb={3} align="center">
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}