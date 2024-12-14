import React from "react";
import { useForm, Controller } from "react-hook-form";

import {
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useMutation } from "@tanstack/react-query";
import axios from "../lib/axios/axios";
import { toast } from "react-toastify";
const EmailSettingsForm = ({ defaultValues, onSuccess }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  // React Query mutation
  const updateEmailSettings = useMutation({
    mutationFn : (data) => axios.post("/api/update-email-settings", data),
    onSuccess: (response) => {
      toast.success(response.data)
    },
    onError: (error) => {
      console.error("Error Updating Settings:", error.response?.data || error);
      toast.error("Failed to update email settings.");
    },
  });

  const onSubmit = (data) => {
    updateEmailSettings.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Email Settings
      </Typography>

      {/* Email Service Status */}
      <Controller
        name="email_status"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Switch
                {...field}
                checked={field.value}
                onChange={(e) =>
                  setValue("email_status", e.target.checked)
                }
              />
            }
            label="Enable Email Service"
            sx={{ mt: 2 }}
          />
        )}
      />

      {/* Driver Field */}
      <Controller
        name="email_driver"
        control={control}
        rules={{ required: "Email driver is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            placeholder="Enter Email Driver (e.g., smtp)"
            fullWidth
            margin="normal"
            error={!!errors.email_driver}
            helperText={errors.email_driver?.message}
          />
        )}
      />

      {/* Host Field */}
      <Controller
        name="email_host"
        control={control}
        rules={{ required: "Host is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            placeholder="Enter Email Host"
            fullWidth
            margin="normal"
            error={!!errors.email_host}
            helperText={errors.email_host?.message}
          />
        )}
      />

      {/* Port Field */}
      <Controller
        name="email_port"
        control={control}
        rules={{ required: "Port is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            placeholder="Enter Port"
            fullWidth
            margin="normal"
            type="number"
            error={!!errors.email_port}
            helperText={errors.email_port?.message}
          />
        )}
      />

      {/* Username Field */}
      <Controller
        name="email_username"
        control={control}
        rules={{ required: "Username is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            placeholder="Enter Email Username"
            fullWidth
            margin="normal"
            error={!!errors.email_username}
            helperText={errors.email_username?.message}
          />
        )}
      />

      {/* Password Field */}
      <Controller
        name="email_password"
        control={control}
        rules={{ required: "Password is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            placeholder="Enter Email Password"
            fullWidth
            margin="normal"
            type="password"
            error={!!errors.email_password}
            helperText={errors.email_password?.message}
          />
        )}
      />

      {/* Encryption Field */}
      <Controller
        name="email_encryption"
        control={control}
        rules={{ required: "Encryption type is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            placeholder="Enter Encryption Type (e.g., tls, ssl)"
            fullWidth
            margin="normal"
            error={!!errors.email_encryption}
            helperText={errors.email_encryption?.message}
          />
        )}
      />

      {/* From Address Field */}
      <Controller
        name="email_id"
        control={control}
        rules={{ required: "From address is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            placeholder="Enter From Address (Email ID)"
            fullWidth
            margin="normal"
            error={!!errors.email_id}
            helperText={errors.email_id?.message}
          />
        )}
      />

      {/* From Name Field */}
      <Controller
        name="email_name"
        control={control}
        rules={{ required: "From name is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            placeholder="Enter From Name"
            fullWidth
            margin="normal"
            error={!!errors.email_name}
            helperText={errors.email_name?.message}
          />
        )}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        startIcon={<SaveIcon />}
        disabled={updateEmailSettings.isLoading}
      >
        {updateEmailSettings.isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
};

export default EmailSettingsForm;
