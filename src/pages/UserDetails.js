import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useUserDetails } from "../hooks/react-query/auth";
import {
  updateRoleRequest,
  useAllRolesWithPermissions,
} from "../hooks/react-query/role-permission";
import { useMutation } from "@tanstack/react-query";
import PersonIcon from "@mui/icons-material/Person";
import ProgressBar from "../components/ProgressBar";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import CustomModal from "../components/CustomModal";
import { Controller, useForm } from "react-hook-form";
import { handleValidationErrors } from "../utiles/errorHandle";
import { createPaymentRequest } from "../hooks/react-query/property";

function UserDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [open, setOpen] = useState(false);
  const {
    data: roles,
    isLoading: rolesLoading,
    error: rolesError,
  } = useAllRolesWithPermissions();
  const { data: userDetails, isLoading: userLoading } = useUserDetails(id);
  const mutation = useMutation({
    mutationFn: updateRoleRequest,
    onSuccess: () => {
      toast.success("User role updated successfully.");
    },
    onError: (error) => {
      console.error("Failed to update role", error);
    },
  });

  const handleUpdateRole = () => {
    if (userDetails && selectedRole) {
      mutation.mutate({ id: userDetails.id, role: selectedRole });
    }
  };
  useEffect(() => {
    const data = Object.keys(userDetails || {}).filter(
      (key) =>
        ![
          "id",
          "created_at",
          "updated_at",
          "firebase_uid",
          "email_verified_at",
          "approved",
          "property",
          "flat",
          "property_id",
          "flat_id",
        ].includes(key)
    );
    setFilteredData(data);
    setSelectedRole(searchParams.get("role"));
  }, [userDetails, searchParams]);
  // payment modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    control,
    handleSubmit
  } = useForm();
  const paymentmutation = useMutation({
    mutationFn: createPaymentRequest ,
    retry: 1,
    onSuccess: (data) => {
     toast.success(data);
     handleClose()
    },
    onError: (error) => {
      handleValidationErrors(error);
    },
  });
  const onSubmit = (data) => {
    const newData = { ...data, flat_id: userDetails?.flat.id, user_id: id,  };
    paymentmutation.mutate(newData)
  };

  if (rolesLoading && userLoading) {
    return <ProgressBar />;
  }
  return (
    <Box
      sx={{
        padding: 3,
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ mb: 3, mt: 1, textAlign: "center" }}>
        <PersonIcon fontSize="large" sx={{ my: 2 }} />
        <Divider />
        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
          {userDetails?.name}
        </Typography>
        <Typography variant="body1">{userDetails?.email}</Typography>
      </Box>
      <div>
        <Grid container spacing={2}>
          {/* First Box */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                padding: 3,
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              {rolesLoading ? (
                <ProgressBar />
              ) : rolesError ? (
                <p>Error loading roles!</p>
              ) : (
                <Select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  fullWidth
                >
                  {roles?.map((role) => (
                    <MenuItem key={role.id} value={role.name}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
              <Button
                onClick={handleUpdateRole}
                variant="contained"
                sx={{ my: 2, width: "100%" }}
                disabled={mutation.isLoading}
              >
                Update Role
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                padding: 3,
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}
            >
              <Button onClick={handleOpen} sx={{ textAlign: "right" }}>
                Create Payment
              </Button>
              <Typography variant="h5">
                {userDetails?.property?.name}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="p">{userDetails?.flat?.name}</Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <tbody>
            {filteredData.map((key) => (
              <tr key={key}>
                <td style={{ textTransform: "capitalize", fontWeight: "bold" }}>
                  {key.replace(/_/g, " ")}
                </td>
                <td>{userDetails[key] || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <CustomModal open={open} handleClose={handleClose}>
          <h2>Create Payment</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="type"
              control={control}
              defaultValue=""
              rules={{
                required: "Payment type is required",
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  type="text"
                  variant="outlined"
                  fullWidth
                  placeholder="Type (e.g., Installment)"
                  margin="normal"
                  error={!!error}
                  helperText={error ? error.message : ""}
                />
              )}
            />

            <Controller
              name="amount"
              control={control}
              defaultValue=""
              rules={{
                required: "Amount is required",
                validate: (value) =>
                  value > 0 || "Amount must be greater than 0",
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  type="number"
                  variant="outlined"
                  fullWidth
                  placeholder="Amount"
                  margin="normal"
                  error={!!error}
                  helperText={error ? error.message : ""}
                />
              )}
            />

            <Controller
              name="frequency"
              control={control}
              defaultValue="1 month"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  select
                  variant="outlined"
                  fullWidth
                  label="Select Frequency"
                  margin="normal"
                  error={!!error}
                  helperText={error ? error.message : ""}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="15 days">15 days</option>
                  <option value="1 month">1 month</option>
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                </TextField>
              )}
            />

            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  type="text"
                  variant="outlined"
                  fullWidth
                  placeholder="Description"
                  margin="normal"
                  multiline
                  rows={4}
                  error={!!error}
                  helperText={error ? error.message : ""}
                />
              )}
            />

            {/* <Controller
              name="status"
              control={control}
              defaultValue="pending"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  select
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!error}
                  helperText={error ? error.message : ""}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </TextField>
              )}
            /> */}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Create Payment
            </Button>
          </form>
        </CustomModal>
      </div>
    </Box>
  );
}

export default UserDetails;
