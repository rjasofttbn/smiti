import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Menu, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Topbar({ toggleSidebar, sidebarOpen }) {
  const navigate = useNavigate();

    const logout = () => {
      localStorage.removeItem("token");
      navigate("/", { replace: true }); // good
    };

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/", { replace: true });
//   };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#111827" }}>
      <Toolbar>
        {/* Sidebar toggle button */}
        <IconButton color="inherit" onClick={toggleSidebar} edge="start">
          {sidebarOpen ? <ArrowBack /> : <Menu />}
        </IconButton>

        {/* Title/logo - takes all remaining space */}
        <Typography
          className="topbar-logo-button"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          Smiti Management System
        </Typography>

        {/* Logout button pushed to the right */}
        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}