import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Typography,
  Divider,
} from "@mui/material";

import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../context/AuthContext";
import { handleValidationErrors } from "../utiles/errorHandle";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { changePasswordRequest } from "../hooks/react-query/auth";
import UpdateAppSettings from "../components/UpdateAppSettings";
import { useSettings } from "../hooks/react-query/role-permission";
import ProgressBar from "../components/ProgressBar";
const Settings = () => {
  const { data: settings, isLoading } = useSettings();

  const { user, hasPermission } = useAuth();
  const { control, handleSubmit, watch, reset } = useForm();

  const mutation = useMutation({
    mutationFn: changePasswordRequest,
    retry: 1,
    onSuccess: (data) => {
      toast.success(data);
      reset({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
    },
    onError: (error) => {
      if (error.response.data) {
        toast.error(error.response.data);
      }
      handleValidationErrors(error);
    },
  });
  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  // Watch password fields for validation
  const password = watch("new_password", "");
  if(isLoading){
    return <ProgressBar/>
  }
  
  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Settings
      </Typography>
      <Divider />
      <Box
        sx={{
          display: "grid",
          gap: 4,
          padding: {xs : 1,sm : 4},
          gridTemplateColumns: {
            xs: "1fr", // Single column for small screens
            sm: hasPermission("settings") ? "1fr 1fr" : "1fr", // Two columns for medium screens if both boxes are present
          },
        }}
      >
         {hasPermission("settings") && (
          <Box
            sx={{
              padding: 3,
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <UpdateAppSettings settings={settings}/>
          </Box>
        )}
        <Box
          sx={{
            maxWidth: "500px",
            margin: "auto",
            
            padding: 3,
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Display User Information */}
          <Box sx={{ mb: 3, mt: 1, textAlign: "center" }}>
            <PersonIcon />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {user?.name || "Not Available"}
            </Typography>
            <Typography variant="body1">
              {user?.email || "Not Available"}
            </Typography>
          </Box>
          <Divider sx={{ my: 3 }} />

          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Change Password
            </Typography>

            {/* current Password Field */}
            <Controller
              name="current_password"
              control={control}
              rules={{
                required: "Current Password is required",
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  type="password"
                  variant="outlined"
                  placeholder="Enter current password"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon style={{ color: "gray" }} />
                      </InputAdornment>
                    ),
                  }}
                  error={!!error}
                  helperText={error ? error.message : ""}
                />
              )}
            />
            {/* New Password Field */}
            <Controller
              name="new_password"
              control={control}
              rules={{
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  type="password"
                  variant="outlined"
                  placeholder="Enter new password"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon style={{ color: "gray" }} />
                      </InputAdornment>
                    ),
                  }}
                  error={!!error}
                  helperText={error ? error.message : ""}
                />
              )}
            />

            {/* Confirm Password Field */}
            <Controller
              name="new_password_confirmation"
              control={control}
              rules={{
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  type="password"
                  variant="outlined"
                  placeholder="Confirm new password"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon style={{ color: "gray" }} />
                      </InputAdornment>
                    ),
                  }}
                  error={!!error}
                  helperText={error ? error.message : ""}
                />
              )}
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              Save Changes
            </Button>
          </form>
        </Box>
       
      </Box>
    </>
  );
};

export default Settings;
