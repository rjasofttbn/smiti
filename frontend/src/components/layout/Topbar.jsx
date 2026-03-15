import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Menu, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Topbar({ toggleSidebar, sidebarOpen }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#111827" }}>
      <Toolbar>
        <IconButton color="inherit" onClick={toggleSidebar} edge="start">
          {sidebarOpen ? <ArrowBack /> : <Menu />}
        </IconButton>

        <Typography className="topbar-logo-button">
          Smiti Management System
        </Typography>

        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}