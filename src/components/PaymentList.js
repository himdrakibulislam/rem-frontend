import React, { useState } from "react";
import {
  TablePagination,
  Typography,
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../lib/axios/axios";
import ProgressBar from "./ProgressBar";

import CustomModal from "./CustomModal";
import { Controller, useForm } from "react-hook-form";
import { handleValidationErrors } from "../utiles/errorHandle";
import { toast } from "react-toastify";
import DataTable from "./TableData";
import { useSettings } from "../hooks/react-query/role-permission";
import { formatTimestamp } from "../utiles/functions";
import { useLocation } from "react-router-dom";
import { updatePaymentRequest } from "../hooks/react-query/payment";

// Function to fetch user data
const getPayments = async (page, rowsPerPage) => {
  const response = await axios.get(
    `/api/payments?page=${page + 1}&offset=${rowsPerPage}`
  );
  return response.data;
};
export const paymentColumns = (settings) => [
  {
    field: "created_at",
    label: "Date",
    transform: (value) => formatTimestamp(value),
  },
  {
    field: "amount",
    label: "Amount",
    transform: (value) => `${settings.currency + " " + value}`,
  },
  { field: "type", label: "Type" },
  { field: "status", label: "Status" },
];
export const renderPaymentActions = (row, index, handleOpen, isPaymentPage) => (
  <>
    {row.status !== "paid" ? (
      <Button size="small">Pay</Button>
    ) : (
      <Typography
        variant="span"
        sx={{
          mr: 2,
          padding: "5px 10px",
          borderRadius: "4px",
          backgroundColor: "#d4edda",
          color: "#155724",
        }}
      >
        Paid
      </Typography>
    )}
    {isPaymentPage && (
      <Button size="small" onClick={() =>handleOpen(row.id)} sx={{ mx: 1 }}>
        Edit
      </Button>
    )}
  </>
);
export const flatPaymentStyles = (status) => {
  switch (status.toLowerCase()) {
    case "paid":
      return { backgroundColor: "#d4edda", color: "#155724" };
    case "overdue":
      return { backgroundColor: "#f8d7da", color: "#721c24" };
    case "pending":
      return { backgroundColor: "#fff3cd", color: "#856404" };
    default:
      return { backgroundColor: "#e2e3e5", color: "#383d41" };
  }
};

const PaymentList = () => {
  document.title = "Payments";

  // States for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch data using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["getPayments", page, rowsPerPage], // Query key with dependencies
    queryFn: () => getPayments(page, rowsPerPage), // Query function
    keepPreviousData: true, // To keep previous data while loading new data
  });
  const { data: settings } = useSettings();
  const columns = paymentColumns(settings);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const location = useLocation(); // Get current path
  const isPaymentPage = location.pathname === "/payments";
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rows per page changes
  };
  const [open, setOpen] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(0);
  const { control, handleSubmit } = useForm();
  const handleOpen = (id) => {
    setOpen(true);
    setSelectedPaymentId(id);
  };
  const handleClose = () => setOpen(false);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updatePaymentRequest,
    retry: 1,
    onSuccess: (data) => {
      toast.success(data);

      handleClose();
      queryClient.invalidateQueries({queryKey : ["getPayments"]});
    },
    onError: (error) => {
      handleValidationErrors(error);
      handleClose();
    },
  });

  const onSubmit = (data) => {
    console.log({...data,id:selectedPaymentId});
    mutation.mutate({...data,id:selectedPaymentId});
  };

  if (isLoading) return <ProgressBar />;
  if (error) return <div>Error loading payments!</div>;

  return (
    <React.Fragment>
      <div style={{ overflowX: "auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            my: 2,
          }}
        >
          <DataTable
            title="Payments"
            columns={columns}
            data={data.data}
            actions={(row, index) =>
              renderPaymentActions(row, index, handleOpen, isPaymentPage)
            }
            currency={settings.currency}
            getStatusStyles={flatPaymentStyles}
          />
        </Box>
      </div>
      <TablePagination
        component="div"
        count={data?.total || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {open && (
        <CustomModal open={open} handleClose={handleClose}>
          <Typography variant="h6" sx={{mr :2 , my:2}}>Update Payment Status</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* name  */}
            <Controller
              name="status"
              control={control}
              defaultValue=""
              rules={{
                required: "Property name is required",
              }}
              render={({ field, fieldState: { error } }) => (
                <FormControl fullWidth variant="outlined" error={!!error}>
                  <Select {...field} displayEmpty>
                    <MenuItem value="">
                      <em>Select status</em>
                    </MenuItem>

                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="overdue">Overdue</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                  {error && (
                    <Typography variant="caption" color="error">
                      {error.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />

            {/* Sign In Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                ":hover": { bgcolor: "gray.700" },
              }}
            >
              Update
            </Button>
          </form>
        </CustomModal>
      )}
    </React.Fragment>
  );
};

export default PaymentList;
