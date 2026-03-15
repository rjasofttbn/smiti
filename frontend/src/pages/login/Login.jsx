import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Divider
} from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // --- CAPTCHA STATES ---
  const [captcha, setCaptcha] = useState({ a: 0, b: 0, result: 0 });
  const [captchaInput, setCaptchaInput] = useState("");

  // Function to generate new math question
  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ a, b, result: a + b });
    setCaptchaInput(""); // Clear previous input
  };

  // Generate captcha on page load
  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // 1. Validate Input
    if (!email || !password) {
      setErrorMsg("Please enter email and password");
      return;
    }

    // 2. Validate Captcha
    if (parseInt(captchaInput) !== captcha.result) {
      setErrorMsg("Incorrect Captcha answer. Please try again.");
      generateCaptcha(); // Refresh captcha on failure
      return;
    }

    setLoading(true);

    try {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");

      const res = await axios.post("http://localhost:6060/api/auth/login", {
        email: email,
        password: password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", res.data.email);
      localStorage.setItem("role", res.data.role);

      window.location.replace("/dashboard");
    } catch (err) {
      const message = err.response?.data?.error || "Login failed. Please try again.";
      setErrorMsg(message);
      generateCaptcha(); // Refresh captcha on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: 4,
          width: { xs: "90%", sm: 420 },
          borderRadius: 3,
          textAlign: "center"
        }}
      >
        {/* Title Section */}
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2", mb: 0.5 }}>
          Nobo Smaj Smiti
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" mb={3}>
          Management System Login
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {errorMsg && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {errorMsg}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Math Captcha Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              bgcolor: "#f9f9f9",
              p: 1.5,
              borderRadius: 1,
              border: "1px solid #ddd"
            }}
          >
            <Typography sx={{ fontWeight: "bold", minWidth: "80px" }}>
              {captcha.a} + {captcha.b} =
            </Typography>
            <TextField
              placeholder="Result?"
              size="small"
              type="number"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              sx={{ bgcolor: "white" }}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
            sx={{ mt: 1, py: 1.5, fontWeight: "bold" }}
          >
            {loading ? "Verifying..." : "Login"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}