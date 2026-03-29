import React from "react";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function PaymentsTable({ payments, onDelete, onStatusUpdate }) {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
      <Table sx={{ minWidth: 650 }} aria-label="payments table">
        <TableHead sx={{ backgroundColor: "#f8f9fa" }}>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Shareholder</strong></TableCell>
            <TableCell><strong>Contact No</strong></TableCell>
            <TableCell><strong>Amount</strong></TableCell>
            <TableCell><strong>Payment Date</strong></TableCell>
{/*             <TableCell><strong>Status</strong></TableCell> */}
            <TableCell align="center"><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {payments.map((p) => {
            const isApproved = p.status === "Approved";

            return (
              <TableRow key={p.id} sx={{ "&:hover": { backgroundColor: "#fafafa" } }}>
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.shareholderName}</TableCell>
                <TableCell>{p.contactNo}</TableCell>
                <TableCell><strong>{p.amount}</strong></TableCell>
                <TableCell>
                  {p.paymentDate ? dayjs(p.paymentDate).format("DD-MM-YYYY") : "-"}
                </TableCell>
{/*                 <TableCell> */}
{/*                   <Chip */}
{/*                     label={p.status || "Requested"} */}
{/*                     color={isApproved ? "success" : "warning"} */}
{/*                     size="small" */}
{/*                     variant="outlined" */}
{/*                   /> */}
{/*                 </TableCell> */}
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">

                    {/* Status Toggle */}
{/*                     <Tooltip title={isApproved ? "Approved" : "Approve Now"}> */}
{/*                       <span> */}
{/*                         <IconButton */}
{/*                           size="small" */}
{/*                           disabled={isApproved} */}
{/*                           onClick={() => onStatusUpdate(p.id)} */}
{/*                           sx={{ */}
{/*                             color: isApproved ? "success.main" : "orange", */}
{/*                             border: "1px solid", */}
{/*                             borderColor: isApproved ? "success.main" : "orange", */}
{/*                             "&.Mui-disabled": { */}
{/*                               color: "success.main", */}
{/*                               borderColor: "success.main", */}
{/*                               opacity: 0.6, */}
{/*                             }, */}
{/*                           }} */}
{/*                         > */}
{/*                           {isApproved ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />} */}
{/*                         </IconButton> */}
{/*                       </span> */}
{/*                     </Tooltip> */}

                    {/* Edit */}
                    <Tooltip title="Edit">
                      <span>
                        <IconButton
                          size="small"
                          color="primary"
//                           disabled={isApproved}
                          onClick={() => navigate(`/payments/edit/${p.id}`)}
                          sx={{ border: "1px solid", borderColor: "primary.light" }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>

                    {/* Delete */}
{/*                     <Tooltip title="Delete"> */}
{/*                       <span> */}
{/*                         <IconButton */}
{/*                           size="small" */}
{/*                           color="error" */}
{/*                           disabled={isApproved} */}
{/*                           onClick={() => onDelete(p.id)} */}
{/*                           sx={{ border: "1px solid", borderColor: "error.light" }} */}
{/*                         > */}
{/*                           <DeleteIcon fontSize="small" /> */}
{/*                         </IconButton> */}
{/*                       </span> */}
{/*                     </Tooltip> */}

                  </Stack>
                </TableCell>
              </TableRow>
            );
          })}

          {payments.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                No payments found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}