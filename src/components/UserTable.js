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
  Chip,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "../lib/axios/axios";
import ProgressBar from "./ProgressBar";

// Function to fetch user data
const fetchUsers = async (page, rowsPerPage) => {
  const response = await axios.get(
    `/api/get-users?page=${page + 1}&offset=${rowsPerPage}`
  );
  return response.data;
};

const UserTable = () => {
  document.title = "Users";

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

  if (isLoading) return <ProgressBar />;
  if (error) return <div>Error loading users!</div>;

  return (
    <React.Fragment>
      <div style={{ overflowX: "auto" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead className="bg-gray-200">
              <TableRow>
                <TableCell className="font-semibold" style={{ minWidth: 50 }}>
                  ID
                </TableCell>
                <TableCell className="font-semibold" style={{ minWidth: 100 }}>
                  Name
                </TableCell>
                <TableCell className="font-semibold" style={{ minWidth: 150 }}>
                  Email
                </TableCell>
                <TableCell className="font-semibold" style={{ minWidth: 100 }}>
                  Roles
                </TableCell>
                <TableCell className="font-semibold" style={{ minWidth: 150 }}>
                  Created At
                </TableCell>
                <TableCell className="font-semibold" style={{ minWidth: 150 }}>
                  Email Verified
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user?.roles?.join(", ")}</TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {user.email_verified_at ? (
                      new Date(user.email_verified_at).toLocaleDateString()
                    ) : (
                      <Chip label="Not Verified" size="small" color="error" />
                    )}
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
    </React.Fragment>
  );
};

export default UserTable;
