import React from "react";
import { TextField, Button, Typography, Box, FormControlLabel, Switch } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { toast } from "react-toastify";
import Image from "./Image";
import { useMutation } from "@tanstack/react-query";
import { updateSettingsRequest } from "../hooks/react-query/role-permission";
import { handleValidationErrors } from "../utiles/errorHandle";

const UpdateAppSettings = ({ settings }) => {

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      business_name: settings.business_name,
      currency: settings.currency,
      tenant_option_enabled: settings.tenant_option_enabled === 'true'
    },
  });
  const mutation = useMutation({
    mutationFn: updateSettingsRequest,
    onSuccess: (data) => {
      toast.success(data);
      window.location.reload();
    },
    onError: (error) => {
      handleValidationErrors(error)
    }
  });
  const onSubmit = async (data) => {
    mutation.mutate(data);
  };

  const logo = watch("logo");
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Update Settings
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "4px",

          maxWidth: 250,
          margin: "auto",
        }}
      >
        <Image src={settings.logo} className="w-50 h-50" />
      </Box>
      {/* Business Name Field */}
      <Controller
        name="business_name"
        control={control}
        rules={{
          required: "Business name is required",
        }}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            placeholder="Enter business name"
            fullWidth
            margin="normal"
            error={!!errors.business_name}
            helperText={errors.business_name?.message}
          />
        )}
      />

      {/* Currency Field */}
      <Controller
        name="currency"
        control={control}
        rules={{
          required: "Currency is required",
        }}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            placeholder="Enter currency"
            fullWidth
            margin="normal"
            error={!!errors.currency}
            helperText={errors.currency?.message}
          />
        )}
      />

      {/* Logo Upload Field */}
      <Controller
        name="logo"
        control={control}
        render={({ field }) => (
          <>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mt: 2, mb: 2 }}
            >
              <UploadFileIcon sx={{ mr: 1 }} />
              {logo ? logo.name : "Upload Logo"}
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setValue("logo", e.target.files[0]);
                }}
              />
            </Button>
            {errors.logo && (
              <Typography color="error" variant="body2">
                {errors.logo.message}
              </Typography>
            )}
          </>
        )}
      />
         {/* Tenant Option Enabled Field */}
         <Controller
        name="tenant_option_enabled"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Switch
                {...field}
                checked={field.value}
                onChange={(e) => setValue("tenant_option_enabled", e.target.checked)}
              />
            }
            label="Enable Tenant Option"
            sx={{ mt: 2 }}
          />
        )}
      />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        Save Changes
      </Button>
    </form>
  );
};

export default UpdateAppSettings;
