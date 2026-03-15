import React from "react";
import { Card, CardContent, Typography, Box, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function StatCard({ item }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: 217,        // Fixed Width
        height: 227,       // Fixed Height
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.05)",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0px 10px 25px rgba(0,0,0,0.1)"
        }
      }}
    >
      <CardActionArea
        onClick={() => navigate(item.path)}
        sx={{ height: "100%" }}
      >
        <CardContent sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: 2
        }}>
          {/* Icon Circle */}
          <Box sx={{
            backgroundColor: item.bgColor,
            color: item.color,
            width: 60,
            height: 60,
            borderRadius: "50%",
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            {React.cloneElement(item.icon, { sx: { fontSize: 32 } })}
          </Box>

          <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 600, mb: 1 }}>
            {item.title}
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            {item.value}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}