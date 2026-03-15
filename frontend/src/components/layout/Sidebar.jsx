import React, { useState } from "react";
import {
  Drawer, List, ListItemButton, ListItemText, Box, Collapse
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Sidebar({ sidebarOpen }) {
  const navigate = useNavigate();

  // State for collapsing submenus
  const [openShareholders, setOpenShareholders] = useState(false);
  const [openPayments, setOpenPayments] = useState(false);

  const toggleShareholders = () => setOpenShareholders(!openShareholders);
  const togglePayments = () => setOpenPayments(!openPayments);

  return (
    <Drawer
      variant="persistent"
      open={sidebarOpen}
      className="sidebar-drawer"
    >
      {/* Logo */}
      <Box className="sidebar-logo">
        <img src={logo} alt="Smiti Logo" />
      </Box>

      <List>

        {/* Dashboard */}
        <ListItemButton onClick={() => navigate("/dashboard")}>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        {/* Shareholders with submenu */}
        <ListItemButton onClick={toggleShareholders}>
          <ListItemText primary="Shareholders" />
          {openShareholders ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openShareholders} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("/shareholders/list")}
            >
              <ListItemText primary="List Shareholders" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("/shareholders/add")}
            >
              <ListItemText primary="Add Shareholder" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Payments with submenu */}
        <ListItemButton onClick={togglePayments}>
          <ListItemText primary="Payments" />
          {openPayments ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openPayments} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("/payments/list")}
            >
              <ListItemText primary="All Payments" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("/payments/add")}
            >
              <ListItemText primary="Add Payment" />
            </ListItemButton>
          </List>
        </Collapse>

      </List>
    </Drawer>
  );
}