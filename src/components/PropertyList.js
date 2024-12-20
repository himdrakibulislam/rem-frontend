import React, { useState } from "react";
import { TablePagination, Typography, Button, TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../lib/axios/axios";
import ProgressBar from "./ProgressBar";
import AddIcon from "@mui/icons-material/Add";
import CustomModal from "./CustomModal";
import { Controller, useForm } from "react-hook-form";
import { handleValidationErrors } from "../utiles/errorHandle";
import { toast } from "react-toastify";
import { createPropertyRequest } from "../hooks/react-query/property";
import UpdatePropertyModal from "./UpdatePropertyModal";
import DataTable from "./TableData";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Function to fetch user data
const getProperties = async (page, rowsPerPage) => {
  const response = await axios.get(
    `/api/properties?page=${page + 1}&offset=${rowsPerPage}`
  );
  return response.data;
};

const PropertyList = () => {
  document.title = "Users";

  // States for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { hasPermission } = useAuth();
  // Fetch data using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["getProperties", page, rowsPerPage], // Query key with dependencies
    queryFn: () => getProperties(page, rowsPerPage), // Query function
    keepPreviousData: true, // To keep previous data while loading new data
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rows per page changes
  };
  const [open, setOpen] = useState(false);
  const { control, handleSubmit } = useForm();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleOpenUpdate = (property) => {
    setSelectedProperty(property);
    setOpenUpdate(true);
  };

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
  const columns = [
    {
      field: "name",
      label: "Name",
      transform: (value, id) => <Link to={`/property/${id}`}>{value}</Link>,
    },
    {
      field: "address",
      label: "Address",
    },
    { field: "flats_count", label: "Total Flats" },
    { field: "available_flats_count", label: "Availablle Flats" },
  ];
  const renderActions = (row) => (
    <Button onClick={() => handleOpenUpdate(row)} variant="contained">
      Edit
    </Button>
  );
  if (isLoading) return <ProgressBar />;
  if (error) return <div>Error loading properties!</div>;

  return (
    <React.Fragment>
      <div style={{ overflowX: "auto" }}>
        <DataTable
          title="Projects"
          columns={columns}
          data={data.data}
          actions={ hasPermission("manage_properties") ?  renderActions : null}
          onAddClick={hasPermission("manage_properties") ? handleOpen : null}
        />
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
          Add Property
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

export default PropertyList;
