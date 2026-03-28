import React from "react";
import { Button } from "@mui/material";

export default function CustomButton({ children, type = "button", loading = false }) {
  return (
    <Button type={type} variant="contained" fullWidth disabled={loading}>
      {loading ? "Loading..." : children}
    </Button>
  );
}