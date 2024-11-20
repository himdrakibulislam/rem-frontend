import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  Grid,
  Typography,
} from "@mui/material";

const data = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "User" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Manager" },
];

const ResponsiveTable = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <TableContainer component={Paper}>
      {isMobile ? (
        // Mobile View: Use Grid for better responsiveness
        <Grid container spacing={2} padding={2}>
          {data.map((row) => (
            <Grid
              item
              xs={12}
              key={row.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 16,
                marginBottom: 8,
              }}
            >
              <Typography variant="body1" fontWeight="bold">
                Name: {row.name}
              </Typography>
              <Typography variant="body2">Email: {row.email}</Typography>
              <Typography variant="body2">Role: {row.role}</Typography>
            </Grid>
          ))}
        </Grid>
      ) : (
        // Desktop View: Standard Table
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default ResponsiveTable;
