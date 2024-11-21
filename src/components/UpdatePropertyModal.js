import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, TextField, Typography } from "@mui/material";
import CustomModal from "./CustomModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePropertyRequest } from "../hooks/react-query/property";
import { handleValidationErrors } from "../utiles/errorHandle";
import { toast } from "react-toastify";

const UpdatePropertyModal = ({ open, handleClose, property }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: property?.name || "",
      address: property?.address || "",
    },
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({id,data}) => updatePropertyRequest(id,data),
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ['getProperties'] }); 
      handleClose();
    },
    onError: (error) => {
      handleValidationErrors(error);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({ id: property.id, data : {...data} });
  };

  return (
    <CustomModal open={open} handleClose={handleClose}>
      <Typography variant="h6" component="h2">
        Update Property
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Property name is required" }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              type="text"
              fullWidth
              placeholder="Property name"
              margin="normal"
              error={!!error}
              helperText={error ? error.message : ""}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          rules={{ required: "Address is required" }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              type="text"
              multiline
              rows={3}
              fullWidth
              placeholder="Address"
              margin="normal"
              error={!!error}
              helperText={error ? error.message : ""}
            />
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
        >
          Update Property
        </Button>
      </form>
    </CustomModal>
  );
};

export default UpdatePropertyModal;
