// src/components/RolesList.js
import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { getAllRolesWithPermissions } from "../hooks/react-query/role-permission";
import ProgressBar from "./ProgressBar";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CreateRole from "./CreateRole";
import UpdateRole from "./UpdateRole";

function RolePermission() {
  document.title = "Roles with Permissions";
  const queryClient = useQueryClient(); 
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState({});
  const handleOpen = () => setOpen(true);
  const {
    data: roles,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["rolesWithPermissions"],
    queryFn: getAllRolesWithPermissions,
  });
  const handleRoleUpdateSuccess = () => {
    queryClient.invalidateQueries({queryKey:["rolesWithPermissions"]}); // Invalidate the query to trigger a refetch
  };
  if (isLoading) return <ProgressBar />;
  

  if (isError) return <Typography>Error: {error.message}</Typography>;
  
 

  return (
    <TableContainer component={Paper}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Typography variant="h6">Roles with Permissions</Typography>
        <CreateRole onUpdateSuccess={handleRoleUpdateSuccess} />
        {selectedRole && (
          <UpdateRole
            open={open}
            setOpen={setOpen}
            role={selectedRole}
            onUpdateSuccess={handleRoleUpdateSuccess}
          />
        )}
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Role Name</TableCell>
            <TableCell>Permissions</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell sx={{ fontSize: "15px" }}>{role.name}</TableCell>
              <TableCell>
                {role.permissions
                  .map((permission) => permission.name)
                  .join(", ")}
              </TableCell>
              <TableCell>
                <Button
                  variant="text"
                  onClick={() => {
                    handleOpen();
                    setSelectedRole(role);
                  }}
                  sx={{
                    backgroundColor: "transparent",
                    color: "primary.main",
                    boxShadow: "none",
                  }}
                >
                  <ModeEditIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RolePermission;
