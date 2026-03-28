import React, { useState } from "react";
import { Box, Paper, Typography, Divider, Avatar, Select, MenuItem, Alert } from "@mui/material";
import { loginUser } from "../../services/authService";
import TextInput from "../../components/common/TextInput";
import CustomButton from "../../components/common/CustomButton";
import MathCaptcha from "../../components/common/MathCaptcha";
import translations from "../../i18n/translations";

export default function Login() {
  // --- STATE ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [captchaValid, setCaptchaValid] = useState(false);
  const [refreshCaptcha, setRefreshCaptcha] = useState(() => () => {});
// Login.jsx
const [lang, setLang] = useState(() => {
  return localStorage.getItem("lang") || "en"; // use saved language or default to "en"
});
  const langIndex = lang === "en" ? 0 : 1;

const handleLangChange = (e) => {
  const selectedLang = e.target.value;
  setLang(selectedLang);                     // update React state
  localStorage.setItem("lang", selectedLang); // save for page refresh
};
  // --- CAPTCHA HANDLER ---
  const handleCaptcha = (valid, refreshFn) => {
    setCaptchaValid(valid);
    setRefreshCaptcha(() => refreshFn);
  };

  // --- FORM SUBMIT ---
 const handleSubmit = async (e) => {
   e.preventDefault();
   setErrorMsg("");

   if (!email || !password) {
     setErrorMsg(translations.required[langIndex]);
     return;
   }

   if (!captchaValid) {
     setErrorMsg(translations.captchaError[langIndex]);
     if (refreshCaptcha) refreshCaptcha(); // only call if defined
     return;
   }

   setLoading(true);

   try {
     // Use await correctly
     const data = await loginUser(email, password);

     localStorage.setItem("token", data.token);
     localStorage.setItem("userEmail", data.email);
     localStorage.setItem("role", data.role);

     // Navigate to dashboard
     window.location.replace("/dashboard");
   } catch (err) {
     const message = err.response?.data?.error || "Login failed. Please try again.";
     setErrorMsg(message);
     refreshCaptcha();
   } finally {
     setLoading(false);
   }
 };

  // --- JSX ---
  return (
    <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>

      {/* Language Selector */}
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <Select value={lang} onChange={handleLangChange} size="small">
          <MenuItem value="en">EN</MenuItem>
          <MenuItem value="bn">বাংলা</MenuItem>
        </Select>
      </Box>

      <Paper elevation={10} sx={{ padding: 4, width: 420, borderRadius: 4 }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <Avatar src="/images/logo.jpeg" sx={{ width: 80, height: 80 }} />
        </Box>

        <Typography variant="h4" align="center" color="primary">{translations.title[langIndex]}</Typography>
        <Typography align="center" mb={2}>{translations.subtitle[langIndex]}</Typography>
        <Divider sx={{ mb: 3 }} />
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextInput label={translations.email[langIndex]} value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextInput label={translations.password[langIndex]} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          {/* Add MathCaptcha here */}
          <MathCaptcha onValidate={handleCaptcha} />

          <CustomButton type="submit" loading={loading}>
            {translations.loginButton[langIndex]}
          </CustomButton>
        </Box>
      </Paper>
    </Box>
  );
}