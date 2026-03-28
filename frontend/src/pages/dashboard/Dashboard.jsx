import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import StatCard from "../../components/cards/StatCard";
import { getDashboardStats } from "../../config/dashboardStats";

export default function Dashboard() {
  const stats = getDashboardStats();

  return (
    <>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold">
          Dashboard Overview
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="flex-start">
        {stats.map((item, index) => (
          <Grid item key={index}>
            <StatCard item={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}