import {
  Box,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useForm, Controller } from "react-hook-form";
import { useSignUpData } from "../../hooks/react-query/auth";
import { handleValidationErrors } from "../../utiles/errorHandle";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createFlatRequest,
  getAFlatRequest,
  updateFlatRequest,
} from "../../hooks/react-query/property";
import { useNavigate, useParams } from "react-router-dom";
import ProgressBar from "../../components/ProgressBar";

function AddFlat() {
  document.title = "Add/Edit Flat";
  const navigate = useNavigate();
  const { flatId } = useParams();
  const { handleSubmit, control, reset } = useForm();

  const { data: propertyData, isLoading: propertiesLoading } = useSignUpData();
  const { data: flatData, isLoading: flatLoading } = useQuery({
    queryKey: ["flat", flatId],
    queryFn: () => flatId && getAFlatRequest(flatId), // Fetch flat details if editing
    enabled: !!flatId, // Only fetch if flatId exists (i.e., when editing)
    onSuccess: (data) => reset(data), // Prefill form with flat data
  });

  const mutation = useMutation({
    mutationFn: flatId ? updateFlatRequest : createFlatRequest,
    retry: 1,
    onSuccess: (data) => {
      toast.success(
        flatId ? "Flat updated successfully" : "Flat added successfully"
      );
      navigate("/flats");
    },
    onError: (error) => {
      handleValidationErrors(error);
    },
  });

  const onSubmit = (data) => {
    let newData = data;
    if(flatId){
      newData = {...data,flatId}
    }
    mutation.mutate(newData);
  };

  if (propertiesLoading || flatLoading) {
    return <ProgressBar />;
  }
  return (
    <Box
      sx={{
        padding: 3,
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Property Dropdown */}
        <Controller
          name="property_id"
          control={control}
          defaultValue={flatData?.property_id || ""}
          rules={{
            required: "Property is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              select
              variant="outlined"
              fullWidth
              margin="normal"
              label="Select Property"
              error={!!error}
              helperText={error ? error.message : ""}
            >
              {propertyData?.properties?.map((property) => (
                <MenuItem key={property.id} value={property.id}>
                  {property.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {/* Name */}
        <Controller
          name="name"
          control={control}
          defaultValue={flatData?.name || ""}
          rules={{
            required: "Flat name is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              type="text"
              variant="outlined"
              fullWidth
              placeholder="Flat name"
              margin="normal"
              error={!!error}
              helperText={error ? error.message : ""}
            />
          )}
        />

        {/* Size */}
        <Controller
          name="size"
          control={control}
          defaultValue={flatData?.size || ""}
          rules={{
            required: "Size is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              type="number"
              variant="outlined"
              fullWidth
              placeholder="Size (sq ft)"
              margin="normal"
              error={!!error}
              helperText={error ? error.message : ""}
            />
          )}
        />

        {/* Price */}
        <Controller
          name="price"
          control={control}
          defaultValue={flatData?.price || ""}
          rules={{
            required: "Price is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              type="number"
              variant="outlined"
              fullWidth
              placeholder="Price"
              margin="normal"
              error={!!error}
              helperText={error ? error.message : ""}
            />
          )}
        />

        {/* Address */}
        <Controller
          name="address"
          control={control}
          defaultValue={flatData?.address || ""}
          rules={{
            required: "Address is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              type="text"
              multiline
              rows={3}
              variant="outlined"
              fullWidth
              placeholder="Address"
              margin="normal"
              error={!!error}
              helperText={error ? error.message : ""}
            />
          )}
        />

        {/* Bedrooms */}
        <Controller
          name="bedrooms"
          control={control}
          defaultValue={flatData?.bedrooms || ""}
          rules={{
            required: "Number of bedrooms is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              type="number"
              variant="outlined"
              fullWidth
              placeholder="Bedrooms"
              margin="normal"
              error={!!error}
              helperText={error ? error.message : ""}
            />
          )}
        />

        {/* Bathrooms */}
        <Controller
          name="bathrooms"
          control={control}
          defaultValue={flatData?.bathrooms || ""}
          rules={{
            required: "Number of bathrooms is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              type="number"
              variant="outlined"
              fullWidth
              placeholder="Bathrooms"
              margin="normal"
              error={!!error}
              helperText={error ? error.message : ""}
            />
          )}
        />

        {/* Kitchen */}
        <Controller
          name="kitchen"
          control={control}
          defaultValue={flatData?.kitchen || ""}
          rules={{
            required: "Number of kitchens is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              type="number"
              variant="outlined"
              fullWidth
              placeholder="Kitchen"
              margin="normal"
              error={!!error}
              helperText={error ? error.message : ""}
            />
          )}
        />

        {/* Balcony */}
        <Controller
          name="balcony"
          control={control}
          defaultValue={flatData?.balcony || ""}
          rules={{
            required: "Number of balconies is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              type="number"
              variant="outlined"
              fullWidth
              placeholder="Balcony"
              margin="normal"
              error={!!error}
              helperText={error ? error.message : ""}
            />
          )}
        />

        {/* Status */}
        <Controller
          name="status"
          control={control}
          defaultValue={flatData?.status || "available"}
          render={({ field }) => (
            <TextField
              {...field}
              select
              variant="outlined"
              fullWidth
              margin="normal"
              label="Status"
            >
              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="sold">Sold</MenuItem>
              <MenuItem value="reserved">Reserved</MenuItem>
            </TextField>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          <AddIcon /> {flatId ? "Update Flat" : "Add Flat"}
        </Button>
      </form>
    </Box>
  );
}

export default AddFlat;
