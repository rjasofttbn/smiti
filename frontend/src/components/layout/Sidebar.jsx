import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Collapse
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import translations from "../../i18n/translations";

export default function Sidebar({ sidebarOpen, lang }) {
  const navigate = useNavigate();
  const langIndex = lang === "en" ? 0 : 1;

  // Track only one open submenu
  const [openMenu, setOpenMenu] = useState(null); // "shareholders" or "payments"

  const handleMenuClick = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu)); // toggle current menu
  };

  return (
    <Drawer
      variant="persistent"
      open={sidebarOpen}
      sx={{
        width: sidebarOpen ? 240 : 0,
        "& .MuiDrawer-paper": {
          width: sidebarOpen ? 240 : 0,
          transition: "width 0.3s",
        },
      }}
    >
      <Box className="sidebar-logo">
        <img src={logo} alt="Smiti Logo" />
      </Box>

      <List>
        <ListItemButton onClick={() => navigate("/dashboard")}>
          <ListItemText primary={translations.dashboard[langIndex]} />
        </ListItemButton>

        {/* Shareholders menu */}
        <ListItemButton onClick={() => handleMenuClick("shareholders")}>
          <ListItemText primary={translations.shareholders[langIndex]} />
          {openMenu === "shareholders" ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openMenu === "shareholders"} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("/shareholders/list")}
            >
              <ListItemText primary={translations.listShareholders[langIndex]} />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("/shareholders/add")}
            >
              <ListItemText primary={translations.addShareholder[langIndex]} />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Payments menu */}
        <ListItemButton onClick={() => handleMenuClick("payments")}>
          <ListItemText primary={translations.payments[langIndex]} />
          {openMenu === "payments" ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openMenu === "payments"} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("/payments/list")}
            >
              <ListItemText primary={translations.allPayments[langIndex]} />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("/payments/add")}
            >
              <ListItemText primary={translations.addPayment[langIndex]} />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
}