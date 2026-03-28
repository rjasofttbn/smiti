import React from "react";
import { TextField } from "@mui/material";

export default function TextInput({ label, value, onChange, type = "text" }) {
  return (
    <TextField
      label={label}
      type={type}
      fullWidth
      value={value}
      onChange={onChange}
    />
  );
}