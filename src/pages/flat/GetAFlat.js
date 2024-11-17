import * as React from "react";
import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { grey } from "@mui/material/colors";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CustomTabComponent from "../../components/CustomTab";

export default function GetAFlatDetails() {
  document.title = "Flat";
  const getCurrentDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1; // Months are 0-indexed, so add 1
    const day = today.getDate();
    const year = today.getFullYear();
    return `${month}/${day}/${year}`;
  };
  function createData(date, amount, type, status) {
    return { date, amount, type, status };
  }
  const rows = [
    createData("10/12/2024", "$600", "Down Payment", "Paid"),
    createData("10/11/2024", "$300", "Monthly Installment", "Unpaid"),
  ];
  return (
    <React.Fragment>
      <Box sx={{ mb: 2 }}>
        <Link to="/dashboard">
          <KeyboardBackspaceIcon fontSize="small" /> Back To Dashboard
        </Link>
      </Box>
      <Typography variant="h5" fontWeight="bold">
        Flat 101
      </Typography>
      <Typography variant="span" sx={{ color: "#757575" }}>
        Sunset villa
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <Box
              sx={{
                bgcolor: "gray.900",
                p: 3,
                borderRadius: 2,
                boxShadow: 3,
                width: "100%",
                mt: 1,
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                Flat Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography sx={{ color: grey[700], mt: 2 }}>
                    Address
                  </Typography>
                  <Typography
                    fontWeight="500"
                    sx={{ fontSize: "15px" }}
                    variant="address"
                  >
                    <RoomOutlinedIcon /> 123 Ocean View, Beachtown
                  </Typography>
                  <Typography sx={{ color: grey[700], mt: 2 }}>Size</Typography>
                  <Typography
                    fontWeight="500"
                    sx={{ fontSize: "15px" }}
                    variant="address"
                  >
                    <HouseOutlinedIcon /> 34567 sq ft
                  </Typography>
                  <Typography sx={{ color: grey[700], mt: 2 }}>
                    Bathrooms
                  </Typography>
                  <Typography
                    fontWeight="500"
                    sx={{ fontSize: "15px" }}
                    variant="address"
                  >
                    2
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: grey[700], mt: 2 }}>
                    Price
                  </Typography>
                  <Typography
                    fontWeight="500"
                    sx={{ fontSize: "15px" }}
                    variant="address"
                  >
                    $ 4000
                  </Typography>
                  <Typography sx={{ color: grey[700], mt: 2 }}>
                    Bedrooms
                  </Typography>
                  <Typography
                    fontWeight="500"
                    sx={{ fontSize: "15px" }}
                    variant="address"
                  >
                    3
                  </Typography>
                  <Typography sx={{ color: grey[700], mt: 2 }}>
                    Status
                  </Typography>
                  <Typography
                    fontWeight="500"
                    sx={{ fontSize: "15px" }}
                    variant="address"
                  >
                    Sold
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Box
              sx={{
                bgcolor: "gray.900",
                p: 3,
                borderRadius: 2,
                boxShadow: 3,
                width: "100%",
                mt: 1,
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                Payment Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography sx={{ color: grey[700], mt: 2 }}>
                    Purchase Data
                  </Typography>
                  <Typography
                    fontWeight="500"
                    sx={{ fontSize: "15px" }}
                    variant="address"
                  >
                    <CalendarMonthOutlinedIcon /> {getCurrentDate()}
                  </Typography>
                  <Typography sx={{ color: grey[700], mt: 2 }}>
                    {" "}
                    Paid Amount
                  </Typography>
                  <Typography
                    fontWeight="500"
                    sx={{ fontSize: "15px" }}
                    variant="address"
                  >
                    $3000
                  </Typography>
                  <Typography sx={{ color: grey[700], mt: 2 }}>
                    Installment Amount
                  </Typography>
                  <Typography
                    fontWeight="500"
                    sx={{ fontSize: "15px" }}
                    variant="address"
                  >
                    $3000
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: grey[700], mt: 2 }}>
                    Total Amount
                  </Typography>
                  <Typography
                    fontWeight="500"
                    sx={{ fontSize: "15px" }}
                    variant="address"
                  >
                    $ 4000
                  </Typography>
                  <Typography sx={{ color: grey[700], mt: 2 }}>
                    Next Payment Date
                  </Typography>
                  <Typography
                    fontWeight="500"
                    sx={{ fontSize: "15px" }}
                    variant="address"
                  >
                    <CalendarMonthOutlinedIcon /> {getCurrentDate()}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button sx={{ width: "100%" }}>Make Payment</Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <CustomTabComponent
        tabs={[
          {
            label: "Payment History",
            content: (
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={5}>
                        {/* Table Title Section */}
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
                            Payment History
                          </Typography>
                          <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            A record of all payments made for this flat
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                    {/* Table Column Headers */}
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.amount}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell><Chip label={row.status} color={row.status === 'Paid' ? 'success' : 'error'} size="small" /></TableCell>
                        <TableCell>{row.status === "Paid" ? <Chip label="Paid" color="success" size="small" /> : <Button>Pay Now</Button>}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
            ),
          },
          {
            label: "Documents",
            content: "Documents",
          },
        ]}
      />
    </React.Fragment>
  );
}
