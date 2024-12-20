import React from "react";
import { useForm, Controller } from "react-hook-form";

import { TextField, Button, Box, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useAddonUpdateSettings } from "../../hooks/react-query/settings";
import Image from "../Image";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DeleteIcon from "@mui/icons-material/Delete";

const BkashForm = ({ defaultValues, gateway, isBank = false }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  // React Query mutation
  const updateAddonSettings = useAddonUpdateSettings();

  const onSubmit = (data) => {
    const newData = {
      settings: [
        {
          key: "logo_url",
          value: data.logo_url,
        },
        {
          key: "theme_color",
          value: data.theme_color,
        },
        isBank
          ? {
              key: "bank_name",
              value: data.bank_name,
            }
          : {
              key: "receiver_number",
              value: data.receiver_number,
            },
        isBank && {
          key: "account_name",
          value: data.account_name,
        },
        isBank && {
          key: "account_number",
          value: data.account_number,
        },
        isBank && {
          key: "branch_name",
          value: data.branch_name,
        },
        isBank && {
          key: "routing_numbe",
          value: data.routing_numbe,
        },
        {
          key: "payment_instructions",
          value: data.payment_instructions,
        },
      ].filter(Boolean),
    };
    updateAddonSettings.mutate({ data: newData, settingsType: gateway });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box textAlign="right">
        <Button
          sx={{
            mt: 2,
            backgroundImage: `linear-gradient(to right, ${gateway.theme_color}, ${gateway.theme_color})`, // Linear gradient
            color: "white",
            ":hover": {
              color: "white",
            },
          }}
        >
          <DeleteIcon />
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "4px",
          maxWidth: 150,
          margin: "auto",
        }}
      >
        <Image src={defaultValues.logo_url} />
      </Box>

      {/* Email Service Status */}
      {/* <Controller
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
      /> */}

      {/* logo url */}
      <Controller
        name="logo_url"
        control={control}
        rules={{ required: "Logo url is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            placeholder="Enter logo url"
            fullWidth
            margin="normal"
            error={!!errors.logo_url}
            helperText={errors.logo_url?.message}
          />
        )}
      />
      {/* theme color */}
      <Controller
        name="theme_color"
        control={control}
        rules={{ required: "Theme color is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            placeholder="Enter Theme color"
            fullWidth
            margin="normal"
            error={!!errors.theme_color}
            helperText={errors.theme_color?.message}
          />
        )}
      />
      {isBank ? (
        <Controller
          name="bank_name"
          control={control}
          rules={{ required: "Bank name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              placeholder="Enter receiver bank name"
              fullWidth
              margin="normal"
              error={!!errors.bank_name}
              helperText={errors.bank_name?.message}
            />
          )}
        />
      ) : (
        <Controller
          name="receiver_number"
          control={control}
          rules={{ required: "Receiver number is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              placeholder="Enter receiver number"
              fullWidth
              margin="normal"
              error={!!errors.receiver_number}
              helperText={errors.receiver_number?.message}
            />
          )}
        />
      )}
      {isBank && (
        <Controller
          name="account_name"
          control={control}
          rules={{ required: "Account name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              placeholder="Enter account name"
              fullWidth
              margin="normal"
              error={!!errors.account_name}
              helperText={errors.account_name?.message}
            />
          )}
        />
      )}
      {isBank && (
        <Controller
          name="account_number"
          control={control}
          rules={{ required: "Account number is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              placeholder="Enter account number"
              fullWidth
              margin="normal"
              error={!!errors.account_number}
              helperText={errors.account_number?.message}
            />
          )}
        />
      )}
      {isBank && (
        <Controller
          name="branch_name"
          control={control}
          rules={{ required: "Branch name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              placeholder="Enter Branch name"
              fullWidth
              margin="normal"
              error={!!errors.branch_name}
              helperText={errors.branch_name?.message}
            />
          )}
        />
      )}
      {isBank && (
        <Controller
          name="routing_numbe"
          control={control}
          rules={{ required: "Routing numbe is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              placeholder="Enter routing numbe"
              fullWidth
              margin="normal"
              error={!!errors.routing_numbe}
              helperText={errors.routing_numbe?.message}
            />
          )}
        />
      )}
      {/*  payment instructions */}
      <Controller
        name="payment_instructions"
        control={control}
        rules={{ required: "Payment instructions is required" }}
        render={({ field }) => (
          <>
            <ReactQuill
              value={field.value || ""}
              onChange={(content) => field.onChange(content)}
              theme="snow"
              placeholder="Enter payment instructions"
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image", "video"],
                  ["clean"],
                ],
              }}
            />
            {errors.payment_instructions && (
              <Typography
                variant="caption"
                color="error"
                sx={{ mt: 1, display: "block" }}
              >
                {errors.payment_instructions.message}
              </Typography>
            )}
          </>
        )}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="#CF2771"
        sx={{
          mt: 2,
          backgroundImage: `linear-gradient(to right, ${gateway.theme_color}, ${gateway.theme_color})`, // Linear gradient
          color: "white",
          ":hover": {
            color: "white",
          },
        }}
        startIcon={<SaveIcon />}
        disabled={updateAddonSettings.isLoading}
      >
        {updateAddonSettings.isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
};

export default BkashForm;
