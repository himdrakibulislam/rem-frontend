import React, {  useState } from "react";
import {
  TablePagination,
  Chip,
  Button,
  Box
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../lib/axios/axios";
import ProgressBar from "./ProgressBar";
import DataTable from "./TableData";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
    {
      field: "approved",
      label: "Status",
      transform: (value) =>
        value === 1 ? (
          <Chip
            sx={{ backgroundColor: "#d4edda", color: "#155724" }}
            label="Approved"
            size="small"
          />
        ) : (
          <Chip
            sx={{ backgroundColor: "#f8d7da", color: "#721c24" }}
            label="Not Approved"
            size="small"
          />
        ),
    },
    {
      field: "created_at",
      label: "Created At",
      transform: (value) => new Date(value).toLocaleDateString(),
    },
  ];
  const approvemutation = useMutation({
    mutationFn: (userId) => axios.patch(`/api/users/${userId}/approve`),
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleApprove = async (userId) => {
    approvemutation.mutate(userId);
  };
  const renderActions = (row) =>
    row.id !== user.id && (
      <Box sx={{ textAlign: "center" }}>
        {row.approved === 0 && (
          <Button
            size="small"
            onClick={() => handleApprove(row.id)}
            sx={{ mr: 1, my: 1, px: 1 }}
          >
            Approve
          </Button>
        )}
        <Button 
        component={Link}
        to={`/users-permission/user/${row.id}?role=${row?.roles[0]}`}>
          View
        </Button>
      </Box>
    );
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
    </React.Fragment>
  );
};

export default UserTable;
