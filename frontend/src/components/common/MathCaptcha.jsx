import React, { useState, useEffect } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function MathCaptcha({ onValidate }) {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [result, setResult] = useState(0);
  const [input, setInput] = useState("");

  const generateCaptcha = () => {
    const x = Math.floor(Math.random() * 10) + 1;
    const y = Math.floor(Math.random() * 10) + 1;
    setA(x);
    setB(y);
    setResult(x + y);
    setInput("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    // validate whenever input changes
    onValidate(input == result, generateCaptcha);
  }, [input, result]);

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Box sx={{ bgcolor: "#f9f9f9", px: 2, py: 1, borderRadius: 1 }}>
        {a} + {b} =
      </Box>
      <TextField
        size="small"
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <IconButton onClick={generateCaptcha}>
        <RefreshIcon />
      </IconButton>
    </Box>
  );
}