import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/cards/StatCard";
import { getDashboardStats } from "../../config/dashboardStats";

export default function Dashboard() {
  const stats = getDashboardStats();

  return (
    <DashboardLayout>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold">Dashboard Overview</Typography>
      </Box>

      {/* spacing={3} adds the gap between your fixed-size cards */}
      <Grid container spacing={3} justifyContent="flex-start">
        {stats.map((item, index) => (
          <Grid
            item
            key={index}
            // We remove xs/md sizes because the card itself has a fixed width
          >
            <StatCard item={item} />
          </Grid>
        ))}
      </Grid>
    </DashboardLayout>
  );
}