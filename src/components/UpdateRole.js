import React, { useEffect } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Modal,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateRole, useAllPermissions } from "../hooks/react-query/role-permission";
import { handleValidationErrors } from "../utiles/errorHandle";

function UpdateRole({ role, open, setOpen, onUpdateSuccess}) {
  const { control, handleSubmit, setValue, reset } = useForm();

  const { data: allPermissions, isLoading } = useAllPermissions();

  useEffect(() => {
    if (role) {
      // Set default values when the modal opens and the role is set
      reset({
        name: role.name,
        permissions: role?.permissions?.map((p) => p.name), // Extract permission names
      });
    }
  }, [role, reset]);

  // Mutation for updating role
  const mutation = useMutation({
    mutationFn: ({ roleId, roleData }) => updateRole(roleId, roleData),
    onSuccess: (data) => {
      toast.success(data);
      onUpdateSuccess()
      setOpen(false)
    },
    onError: (error) => {
        handleValidationErrors(error)
    },
  });

  // Handling form submission
  const onSubmit = (data) => {
    mutation.mutate({
      roleId: role.id,
      roleData: {
        name: data.name,
        permissions: data.permissions,
      },
    });
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div
        style={{
          padding: 20,
          maxWidth: 400,
          margin: "auto",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h6">Update Role</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Role Name Input */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Role Name"
                fullWidth
                margin="normal"
              />
            )}
          />

          {/* Permissions */}
          {isLoading ? (
            <CircularProgress />
          ) : (
            allPermissions.map((permission) => (
              <Controller
                key={permission.id}
                name="permissions"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value.includes(permission.name)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const updatedPermissions = checked
                            ? [...field.value, permission.name]
                            : field.value.filter((p) => p !== permission.name);
                          setValue("permissions", updatedPermissions);
                        }}
                      />
                    }
                    label={permission.name.replace(/_/g, " ")}
                  />
                )}
              />
            ))
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 2 }}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Updating..." : "Update"}
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default UpdateRole;
