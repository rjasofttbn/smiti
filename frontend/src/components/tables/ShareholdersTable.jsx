import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

export default function ShareholdersTable({ shareholders }) {

  return (
    <Table>

      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>NID</TableCell>
          <TableCell>Contact</TableCell>
          <TableCell>Shares</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>

        {shareholders.map((s) => (
          <TableRow key={s.id}>

            <TableCell>{s.id}</TableCell>
            <TableCell>{s.name}</TableCell>
            <TableCell>{s.nid}</TableCell>
            <TableCell>{s.contactNo}</TableCell>
            <TableCell>{s.shareCount}</TableCell>

          </TableRow>
        ))}

      </TableBody>

    </Table>
  );
}