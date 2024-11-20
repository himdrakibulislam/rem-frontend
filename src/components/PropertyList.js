import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../lib/axios/axios";
import ProgressBar from "./ProgressBar";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CustomModal from "./CustomModal";
import { Controller, useForm } from "react-hook-form";
import { handleValidationErrors } from "../utiles/errorHandle";
import { toast } from "react-toastify";
import { createPropertyRequest } from "../hooks/react-query/property";

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
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Projects
          </Typography>
          <Box>
            <Button onClick={handleOpen}>
              <AddIcon /> Add Property
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead className="bg-gray-200">
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Total Flats</TableCell>
                <TableCell>Availablle Flats</TableCell>
                <TableCell>Action </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((property) => (
                <TableRow key={property.id}>
                    
                  <TableCell><Link to={`/property/${property.id}`}>{property.name}</Link></TableCell>
                  <TableCell>{property.address}</TableCell>
                  <TableCell>{property.flats_count}</TableCell>
                  <TableCell>{property.available_flats_count}</TableCell>

                  <TableCell>
                    <Link to="/edit" sx={{ backgroundColor: "white" }}>
                      Edit
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
    </React.Fragment>
  );
};

export default PropertyList;
