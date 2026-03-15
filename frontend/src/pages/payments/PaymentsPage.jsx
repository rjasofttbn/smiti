import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Box,
  Typography,
  Stack,
  IconButton,
  Tooltip
} from "@mui/material";

// Layout & Table Components
import DashboardLayout from "../../components/layout/DashboardLayout";
import PaymentsTable from "../../components/tables/PaymentsTable";
import { getPayments } from "../../api/paymentApi";
import AddIcon from "@mui/icons-material/Add";
// Icons for Export
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableChartIcon from "@mui/icons-material/TableChart";

// Utilities for Export
import { exportToExcel, exportToPDF } from "../../utils/exportUtils";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  // 1. Initial Data Load
  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = () => {
    getPayments()
      .then((res) => setPayments(res.data))
      .catch((err) => console.error("Error fetching payments:", err));
  };

  // 2. Handle Status Toggle (Active/Inactive)
  const handleStatusUpdate = async (id, currentStatus) => {
    // Logic to toggle based on current string
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    const token = localStorage.getItem("token");

    try {
      await axios.patch(`http://localhost:6060/api/payments/${id}/${newStatus}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setPayments(prev => prev.map(p =>
        p.id === id ? { ...p, status: newStatus } : p
      ));
    } catch (err) {
      console.error("Status update error:", err);
      alert("Failed to update status.");
    }
  };

  // 3. Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:6060/api/payments/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPayments(payments.filter((p) => p.id !== id));
        alert("Payment deleted successfully");
      } catch (err) {
        console.error("Delete error:", err);
        alert("Error deleting payment.");
      }
    }
  };

  // 4. Handle Edit Navigation
  const handleEdit = (payment) => {
    navigate(`/payments/edit/${payment.id}`, { state: { payment } });
  };

  return (
    <DashboardLayout>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
          Payments
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          {/* Excel Download Icon */}
          <Tooltip title="Download Excel">
            <IconButton
              color="success"
              onClick={() => exportToExcel(payments, "Payments_List")}
              sx={{ border: '1px solid #e0e0e0' }}
            >
              <TableChartIcon />
            </IconButton>
          </Tooltip>

          {/* PDF Download Icon */}
          <Tooltip title="Download PDF">
            <IconButton
              color="error"
              onClick={() => exportToPDF(payments, "Payments_Report")}
              sx={{ border: '1px solid #e0e0e0' }}
            >
              <PictureAsPdfIcon />
            </IconButton>
          </Tooltip>

          {/* Add Button */}
         <Tooltip title="Add New Payment">
           <IconButton
             color="success"
             onClick={() => navigate("/payments/add")}
             sx={{ backgroundColor: '#e8f5e9' }} // Light green background
           >
             <AddIcon />
           </IconButton>
         </Tooltip>
        </Stack>
      </Box>

      {/* Main Data Table */}
      <PaymentsTable
        payments={payments}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusUpdate={handleStatusUpdate}
      />
    </DashboardLayout>
  );
}