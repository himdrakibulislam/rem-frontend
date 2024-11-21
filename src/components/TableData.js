import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const DataTable = ({
  title,
  columns,
  data,
  actions,
  onAddClick,
  currency = "$",
  getStatusStyles,
}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            my: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
          {onAddClick && (
            <Button onClick={onAddClick}>
              <AddIcon /> Add {title}
            </Button>
          )}
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="data table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field}>{column.label}</TableCell>
              ))}
              {actions && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                {columns.map((column) => (
                  <TableCell key={column.field}>
                    {column.transform ? (
                      column.transform(row[column.field])
                    ) : column.field === "status" && getStatusStyles ? (
                      <Typography
                        variant="span"
                        sx={{
                          padding: "5px 10px",
                          borderRadius: "4px",
                          ...getStatusStyles(row[column.field]),
                        }}
                      >
                        {row[column.field]}
                      </Typography>
                    ) : (
                      row[column.field]
                    )}
                  </TableCell>
                ))}
                {actions && <TableCell>{actions(row, rowIndex)}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DataTable;
