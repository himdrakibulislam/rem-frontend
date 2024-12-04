import React, { useState } from "react";
import {
  TablePagination,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../lib/axios/axios";
import ProgressBar from "./ProgressBar";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CustomModal from "./CustomModal";
import { Controller, useForm } from "react-hook-form";
import { handleValidationErrors } from "../utiles/errorHandle";
import { toast } from "react-toastify";
import { createPropertyRequest } from "../hooks/react-query/property";
import UpdatePropertyModal from "./UpdatePropertyModal";
import DataTable from "./TableData";
import { useSettings } from "../hooks/react-query/role-permission";
import { useAuth } from "../context/AuthContext";

// Function to fetch user data
const getFlats = async (page, rowsPerPage) => {
  const response = await axios.get(
    `/api/flats?page=${page + 1}&offset=${rowsPerPage}`
  );
  return response.data;
};
export const flatColumns = (settings) => {
  return [
    { field: "name", label: "Name" },
    { field: "size", label: "Size", transform: (value) => `${value} sqft` },
    {
      field: "price",
      label: "Price",
      transform: (value) => `${settings.currency + " " + value}`,
    },
    { field: "status", label: "Status" },
  ];
};

export const flatRenderActions = (row, index) => (
  <>
    <Button component={Link} size="small" to={`/flat/edit/${row.id}`}>
      Edit
    </Button>
    <Button
      component={Link}
      size="small"
      to={`/property/${row.property_id}/flat/${row.id}}`}
      sx={{ mx: 1 }}
    >
      View Details
    </Button>
  </>
);
export const flatStatusStyles = (status) => {
  switch (status.toLowerCase()) {
    case "available":
      return { backgroundColor: "#d4edda", color: "#155724" };
    case "sold":
      return { backgroundColor: "#f8d7da", color: "#721c24" };
    case "reserved":
      return { backgroundColor: "#fff3cd", color: "#856404" };
    default:
      return { backgroundColor: "#e2e3e5", color: "#383d41" };
  }
};

const FlatList = () => {
  document.title = "Flats";
  const navigate = useNavigate();
  const { hasPermission } = useAuth();
  // States for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch data using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["getFlats", page, rowsPerPage], // Query key with dependencies
    queryFn: () => getFlats(page, rowsPerPage), // Query function
    keepPreviousData: true, // To keep previous data while loading new data
  });
  const { data: settings } = useSettings();
  const Columns = flatColumns(settings);
  const handleAddFlat = () => {
    navigate("/flat/add");
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rows per page changes
  };
  const [open, setOpen] = useState(false);
  const { control, handleSubmit } = useForm();
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // const handleOpenUpdate = (property) => {
  //   setSelectedProperty(property);
  //   setOpenUpdate(true);
  // };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedProperty(null);
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createPropertyRequest,
    retry: 1,
    onSuccess: (data) => {
      toast.success(data);

      handleClose();
      queryClient.invalidateQueries(["getProperties"]);
    },
    onError: (error) => {
      handleValidationErrors(error);
      // handleClose();
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) return <ProgressBar />;
  if (error) return <div>Error loading properties!</div>;

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
            title="Flats"
            columns={Columns}
            data={data.data}
            actions={
              hasPermission("manage_flats")
                ? flatRenderActions
                : (row) => (
                    <Button
                      component={Link}
                      size="small"
                      to={`/property/${row.property_id}/flat/${row.id}}`}
                      sx={{ mx: 1 }}
                    >
                      View Details
                    </Button>
                  )
            }
            onAddClick={hasPermission("manage_flats") ? handleAddFlat : null}
            currency={settings.currency}
            getStatusStyles={flatStatusStyles}
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
      <CustomModal open={open} handleClose={handleClose}>
        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          Add Flat
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* name  */}
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{
              required: "Property name is required",
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="text"
                variant="outlined"
                fullWidth
                placeholder="Property name"
                margin="normal"
                error={!!error}
                helperText={error ? error.message : ""}
              />
            )}
          />
          {/* address */}
          <Controller
            name="address"
            control={control}
            defaultValue=""
            rules={{
              required: "Address is required",
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="text"
                multiline
                rows={3}
                variant="outlined"
                fullWidth
                placeholder="Address"
                margin="normal"
                error={!!error}
                helperText={error ? error.message : ""}
              />
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
            <AddIcon /> Add property
          </Button>
        </form>
      </CustomModal>
      {/* Update Modal */}
      {selectedProperty && (
        <UpdatePropertyModal
          open={openUpdate}
          handleClose={handleCloseUpdate}
          property={selectedProperty}
        />
      )}
    </React.Fragment>
  );
};

export default FlatList;
