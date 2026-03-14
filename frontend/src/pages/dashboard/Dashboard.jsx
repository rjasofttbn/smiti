import React, { useEffect, useState } from "react";
import axios from "axios";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

export default function Dashboard() {
  const [shareholders, setShareholders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    axios.get("http://localhost:6060/api/shareholders", config)
      .then(res => setShareholders(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>Dashboard</Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Box m={2}>
        <Typography variant="h4">Shareholders</Typography>
        <ul>
          {shareholders.map(sh => (
            <li key={sh.id}>{sh.name} - {sh.shareCount} shares</li>
          ))}
        </ul>
      </Box>
    </Box>
  );
}