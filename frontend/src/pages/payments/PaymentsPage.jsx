import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Tooltip
} from "@mui/material";

import PaymentsTable from "../../components/tables/PaymentsTable";
import { getPayments } from "../../api/paymentApi";

import AddIcon from "@mui/icons-material/Add";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableChartIcon from "@mui/icons-material/TableChart";

import { exportToExcel, exportToPDF } from "../../utils/exportUtils";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = () => {
    getPayments()
      .then((res) => {
        console.log("API DATA:", res.data); // DEBUG
        setPayments(res.data);
      })
      .catch((err) => console.error(err));
  };
// ✅ Add this inside PaymentsPage
const onStatusUpdate = async (id) => {
  console.log("Update status for ID:", id); // debug

  try {
    // Call API if you have backend route
    await fetch(`http://localhost:8080/payments/${id}/approve`, {
      method: "PUT",
    });

    // Update UI instantly
    const updated = payments.map((p) =>
      p.id === id ? { ...p, status: "Approved" } : p
    );
    setPayments(updated);

  } catch (err) {
    console.error(err);
  }
};
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Payments</Typography>

        <Stack direction="row" spacing={2}>
          <Tooltip title="Excel">
            <IconButton
              color="success"          // MUI color
              onClick={() => exportToExcel(payments)}
              sx={{ border: '1px solid #e0e0e0' }}
            >
              <TableChartIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="PDF">
            <IconButton
              color="error"            // Red color for PDF
              onClick={() => exportToPDF(payments)}
              sx={{ border: '1px solid #e0e0e0' }}
            >
              <PictureAsPdfIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Add">
            <IconButton
              color="primary"          // Blue color for Add
              onClick={() => navigate("/payments/add")}
              sx={{ border: '1px solid #e0e0e0', backgroundColor: '#e8f5e9' }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
<PaymentsTable payments={payments} onStatusUpdate={onStatusUpdate} />

    </>
  );
}