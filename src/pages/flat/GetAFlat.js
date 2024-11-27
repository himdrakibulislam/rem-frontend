import * as React from "react";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { grey } from "@mui/material/colors";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CustomTabComponent from "../../components/CustomTab";
import DataTable from "../../components/TableData";
import { useSettings } from "../../hooks/react-query/role-permission";
import {
  flatPaymentStyles,
  paymentColumns,
  renderPaymentActions,
} from "../../components/PaymentList";
import { useQuery } from "@tanstack/react-query";
import { getAFlatRequest } from "../../hooks/react-query/property";
import ProgressBar from "../../components/ProgressBar";
import { flatStatusStyles } from "../../components/FlatList";
import { formatCurrency, formatTimestamp } from "../../utiles/functions";

export default function GetAFlatDetails() {
  document.title = "Flat 303";
  const { flatId } = useParams();
  const { data: settings } = useSettings();
  const { data, isLoading } = useQuery({
    queryKey: ["getAflat", flatId],
    queryFn: () => getAFlatRequest(flatId),
    keepPreviousData: true,
  });
  const columns = paymentColumns(settings);
  if (isLoading) {
    return <ProgressBar />;
  }
  return (
    <React.Fragment>
      <Box sx={{ mb: 2 }}>
        <Link to="/dashboard">
          <KeyboardBackspaceIcon fontSize="small" /> Back To Dashboard
        </Link>
      </Box>
      <Typography variant="h5" fontWeight="bold">
        {data.name}
      </Typography>
      <Typography variant="span" sx={{ color: "#757575" }}>
        {data.property.name}
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
                    <RoomOutlinedIcon /> {data.address}
                  </Typography>
                  <Typography sx={{ color: grey[700], mt: 2 }}>Size</Typography>
                  <Typography
                    fontWeight="500"
                    sx={{ fontSize: "15px" }}
                    variant="address"
                  >
                    <HouseOutlinedIcon /> {data.size} sq ft
                  </Typography>
                  <Typography sx={{ color: grey[700], mt: 2 }}>
                    Bathrooms
                  </Typography>
                  <Typography
                    fontWeight="500"
                    sx={{ fontSize: "15px" }}
                    variant="address"
                  >
                    {data.bathrooms}
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
                    {formatCurrency(settings.currency,data.price)}
               
                  </Typography>
                  <Typography sx={{ color: grey[700], mt: 2 }}>
                    Bedrooms
                  </Typography>
                  <Typography
                    fontWeight="500"
                    sx={{ fontSize: "15px" }}
                    variant="address"
                  >
                    {data.bedrooms}
                  </Typography>
                  <Typography sx={{ color: grey[700], mt: 2 }}>
                    Status
                  </Typography>
                  <Chip
                    fontWeight="500"
                    sx={{ fontSize: "15px", ...flatStatusStyles(data.status) }}
                    label={data.status}
                  />
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
                    <CalendarMonthOutlinedIcon /> {formatTimestamp(data.created_at)}
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
                    {formatCurrency(settings.currency,data.price)}
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
                    <CalendarMonthOutlinedIcon /> {formatTimestamp(data.created_at)}
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
              <>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
                    Payment History
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    A record of all payments made for this flat
                  </Typography>
                </Box>
                <DataTable
                  columns={columns}
                  data={data.payments}
                  actions={renderPaymentActions}
                  getStatusStyles={flatPaymentStyles}
                />
              </>
            ),
          },
          {
            label: "Documents",
            content: "Loading............",
          },
        ]}
      />
    </React.Fragment>
  );
}
