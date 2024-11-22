import React, { useState } from "react";
import {
  TablePagination,
  Chip,
  Button,
  Box,
  Typography,
  Divider,
  Select,
  MenuItem,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../lib/axios/axios";
import ProgressBar from "./ProgressBar";
import DataTable from "./TableData";
import CustomModal from "./CustomModal";
import PersonIcon from "@mui/icons-material/Person";
import {
  updateRoleRequest,
  useAllRolesWithPermissions,
} from "../hooks/react-query/role-permission";
import { useAuth } from "../context/AuthContext";

// Function to fetch user data
const fetchUsers = async (page, rowsPerPage) => {
  const response = await axios.get(
    `/api/get-users?page=${page + 1}&offset=${rowsPerPage}`
  );
  return response.data;
};

const UserTable = () => {
  document.title = "Users";
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const handleOpen = (user) => {
    setSelectedUser(user);
    setSelectedRow(user);
    setSelectedRole(user?.roles[0] || "");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  // States for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch data using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", page, rowsPerPage], // Query key with dependencies
    queryFn: () => fetchUsers(page, rowsPerPage), // Query function
    keepPreviousData: true, // To keep previous data while loading new data
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rows per page changes
  };
  const columns = [
    { field: "id", label: "ID" },
    { field: "name", label: "Name" },
    {
      field: "email",
      label: "Email",
    },
    {
      field: "roles",
      label: "Role",
      transform: (value) => `${value?.join(", ")}`,
    },
    {
      field: "created_at",
      label: "Created At",
      transform: (value) => new Date(value).toLocaleDateString(),
    },
    {
      field: "email_verified_at",
      label: "Email Verified",
      transform: (value) =>
        value ? (
          new Date(value).toLocaleDateString()
        ) : (
          <Chip
            sx={{ backgroundColor: "#f8d7da", color: "#721c24" }}
            label="Not Verified"
            size="small"
          />
        ),
    },
  ];
  const renderActions = (row) => row.id !== user.id && <Button onClick={() => handleOpen(row)}>View</Button>;
  const {
    data: roles,
    isLoading: rolesLoading,
    error: rolesError,
  } = useAllRolesWithPermissions();
  const mutation = useMutation({
    mutationFn: updateRoleRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      handleClose();
    },
    onError: (error) => {
      console.error("Failed to update role", error);
    },
  });
  const handleUpdateRole = () => {
    if (selectedRow && selectedRole) {
      mutation.mutate({ id: selectedRow.id, role: selectedRole });
    }
  };
  if (isLoading) return <ProgressBar />;
  if (error) return <div>Error loading users!</div>;

  return (
    <React.Fragment>
      <div style={{ overflowX: "auto" }}>
        <DataTable
          title="Customers"
          columns={columns}
          data={data.data}
          actions={renderActions}
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
        <Box sx={{ mb: 3, mt: 1, textAlign: "center" }}>
          <PersonIcon fontSize="large" sx={{ my: 2 }} />
          <Divider />
          <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
            {selectedUser?.name}
          </Typography>
          <Typography variant="body1">{selectedUser?.email}</Typography>
        </Box>
        <div>
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
            sx={{ mt: 2 }}
            disabled={mutation.isLoading}
          >
            Update Role
          </Button>
        </div>
      </CustomModal>
    </React.Fragment>
  );
};

export default UserTable;
