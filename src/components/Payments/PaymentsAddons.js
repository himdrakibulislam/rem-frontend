import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  addGatewayAddonSettings,
  useAddonSettings,
} from "../../hooks/react-query/settings";
import ProgressBar from "../ProgressBar";
import BkashForm from "./BkashFrom";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import CustomModal from "../CustomModal";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ReactQuill from "react-quill";

function PaymentsAddons() {
  const { data, isLoading } = useAddonSettings();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const addAddonSettingsMutation = useMutation({
    mutationFn: addGatewayAddonSettings,
    onSuccess: (response) => {
      queryClient.invalidateQueries({queryKey : ["add-settings"]});
      handleClose();
    },
    onError: (error) => {
      console.error("Error", error.response?.data || error);
      toast.error("ERR:......");
      handleClose();
    },
  });
  const onSubmit = (data) => {
    const gatewayName = data.gateway?.toLowerCase();
    const newData = {
      settings: [
        {
          settings_type: gatewayName,
          key: "type",
          value: data.type,
        },
        {
          settings_type: gatewayName,
          key: "logo_url",
          value: data.logo_url,
        },
        {
          settings_type: gatewayName,
          key: "theme_color",
          value: data.theme_color,
        },
        data.type === "bank"
          ? {
              settings_type: gatewayName,
              key: "bank_name",
              value: data.bank_name,
            }
          : {
              settings_type: gatewayName,
              key: "receiver_number",
              value: data.receiver_number,
            },
        data.type === "bank" && {
          settings_type : gatewayName,
          key: "account_name",
          value: data.account_name,
        },
        data.type === "bank" && {
          settings_type : gatewayName,
          key: "account_number",
          value: data.account_number,
        },
        data.type === "bank" && {
          settings_type : gatewayName,
          key: "branch_name",
          value: data.branch_name,
        },
        data.type === "bank" && {
          settings_type : gatewayName,
          key: "routing_numbe",
          value: data.routing_numbe,
        },
        {
          settings_type : gatewayName,
          key: "payment_instructions",
          value: data.payment_instructions,
        },
      ].filter(Boolean),
    };
    addAddonSettingsMutation.mutate(newData);
  };
  const type = watch("type");
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
              <Controller
                name="type"
                control={control}
                defaultValue=""
                rules={{ required: "Type is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <FormControl fullWidth variant="outlined" error={!!error}>
                      <Select {...field} displayEmpty>
                        <MenuItem selected value="">
                          <em>Select type</em>
                        </MenuItem>
                        <MenuItem value="bank">Bank</MenuItem>
                        <MenuItem value="mobile_bank">Mobile Bank</MenuItem>
                      </Select>
                      {error && (
                        <Typography variant="caption" color="error">
                          {error.message}
                        </Typography>
                      )}
                    </FormControl>
                  </>
                )}
              />
              <Controller
                name="gateway"
                control={control}
                defaultValue=""
                rules={{ required: "Gateway is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextField
                      {...field}
                      variant="outlined"
                      placeholder="Enter gateway name"
                      fullWidth
                      margin="normal"
                      error={!!errors.gateway}
                      helperText={errors.gateway?.message}
                    />
                  </>
                )}
              />
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
              {type === "mobile_bank" && (
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
              {/* Bank name */}
              {type === "bank" && (
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
              )}
              {/* bank account number */}
              {type === "bank" && (
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
              {type === "bank" && (
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
              {type === "bank" && (
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
              {type === "bank" && (
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
              {/* payment instructions */}
              <Controller
                name="payment_instructions"
                control={control}
                rules={{ required: "Payment instructions is required" }}
                render={({ field }) => (
                  <>
                    <Typography sx={{ my: 2 }}>Payment Instructions</Typography>
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
                sx={{ my: 2 }}
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
