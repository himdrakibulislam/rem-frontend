import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { addGatewayAddonSettings, useAddonSettings } from "../../hooks/react-query/settings";
import ProgressBar from "../ProgressBar";
import BkashForm from "./BkashFrom";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import CustomModal from "../CustomModal";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

function PaymentsAddons() {
  const { data, isLoading } = useAddonSettings();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const addAddonSettingsMutation = useMutation({
    mutationFn:  addGatewayAddonSettings,
    onSuccess: (response) => {
      toast.success(response);
    },
    onError: (error) => {
      console.error("Error Updating Settings:", error.response?.data || error);
      toast.error("Failed to update settings.");
    },
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  if (isLoading) {
    return <ProgressBar />;
  }
  return (
    <Grid container spacing={2}>
      <Grid
        marginTop={2}
        item
        xs={12}
        sm={12}
        lg={12}
        container
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography sx={{ mx: 2 }} variant="h6">
          Mobile Banking
        </Typography>
        <Button onClick={handleOpen}>
          <AddIcon /> Add New
        </Button>
        {open && (
          <CustomModal open={open} handleClose={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
             

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

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="#CF2771"
                startIcon={<AddIcon />}
                disabled={addAddonSettingsMutation.isLoading}
              >
                Add
              </Button>
            </form>
          </CustomModal>
        )}
      </Grid>
      {Object.entries(data)
        .filter(([key, value]) => value.type === "mobile_bank")
        .map(([key, value]) => (
          <Grid marginTop={2} item xs={12} sm={12} lg={6}>
            <Box
              sx={{
                margin: "auto",
                padding: 3,
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <BkashForm defaultValues={value} gateway={key} />
            </Box>
          </Grid>
        ))}

      <Grid marginTop={2} item xs={12} sm={12} lg={12}>
        <Typography sx={{ mx: 2 }} variant="h6">
          Bank Details
        </Typography>
      </Grid>
      {Object.entries(data)
        .filter(([key, value]) => value.type === "bank")
        .map(([key, value]) => (
          <Grid marginTop={2} item xs={12} sm={12} lg={6}>
            <Box
              sx={{
                margin: "auto",
                padding: 3,
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <BkashForm defaultValues={value} isBank gateway={key} />
            </Box>
          </Grid>
        ))}
    </Grid>
  );
}

export default PaymentsAddons;
