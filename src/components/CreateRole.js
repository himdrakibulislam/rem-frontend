import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import CustomModal from "./CustomModal";
import { Controller, useForm } from "react-hook-form";
import {
  createRole,
  useAllPermissions,
} from "../hooks/react-query/role-permission";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { handleValidationErrors } from "../utiles/errorHandle";

function CreateRole({onUpdateSuccess}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      permissions: [],
    },
  });
  const { data: permissions, isLoading } = useAllPermissions();
  const mutation = useMutation({
    mutationFn: createRole,
    retry: 1,
    onSuccess: (data) => {
      toast.success(data);
      onUpdateSuccess();
      handleClose();
    },
    onError: (error) => {
        handleValidationErrors(error)
        // handleClose();
    },
  });
  const onSubmit = (data) => {
    mutation.mutate(data);
  };
  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <>
      <Button onClick={handleOpen}><AddIcon/> Create Role</Button>
      <CustomModal open={open} handleClose={handleClose}>
        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          Create Role
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* role Field */}
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{
              required: "Role name is required",
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="text"
                variant="outlined"
                fullWidth
                placeholder="Role name"
                margin="normal"
                error={!!error}
                helperText={error ? error.message : ""}
              />
            )}
          />
          {/* Permissions */}
          {permissions.map((permission) => (
            <Controller
              key={permission.id}
              name="permissions"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value.includes(permission.name)} // Check based on name
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        field.onChange(
                          isChecked
                            ? [...field.value, permission.name] // Add name on selection
                            : field.value.filter(
                                (name) => name !== permission.name
                              ) // Remove name on deselection
                        );
                      }}
                    />
                  }
                  label={permission.name.replace(/_/g, " ")}
                />
              )}
            />
          ))}

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
            Create
          </Button>
        </form>
      </CustomModal>
    </>
  );
}

export default CreateRole;
