import React from "react";
import { useForm, Controller } from "react-hook-form";

import {
  TextField,
  Button,
  Box,
  Typography
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useAddonUpdateSettings } from "../../hooks/react-query/settings";
import Image from "../Image";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const BkashForm = ({ defaultValues ,gateway}) => {
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
    const newData ={
        settings : [
            {
                "key" : "logo_url",
                "value" : data.logo_url
            },
            {
                "key" : "theme_color",
                "value" : data.theme_color
            },
            {
                "key" : "receiver_number",
                "value" : data.receiver_number
            },
            {
                "key" : "payment_instructions",
                "value" : data.payment_instructions
            }
        ]
    }
    updateAddonSettings.mutate({data : newData,settingsType : gateway});
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "4px",
                maxWidth: 150,
                margin: "auto" 
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

      {/* receiver number */}
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
        sx={{ mt: 3 }}
        startIcon={<SaveIcon />}
        disabled={updateAddonSettings.isLoading}
      >
        {updateAddonSettings.isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
};

export default BkashForm;
