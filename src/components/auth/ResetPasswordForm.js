import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ResetPasswordRequest } from "../../hooks/react-query/auth";

export default function ResetPasswordForm() {
  const { control, handleSubmit } = useForm();
  const [resetMessage, setResetMessage] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const mutation = useMutation({
    mutationFn: ResetPasswordRequest,
    retry: 1,
    onSuccess: (data) => {
      setResetMessage(data);
    },
    onError: (error) => {
      setResetMessage("");
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data;
        // Display each validation error
        Object.values(validationErrors).forEach((errorMessages) => {
          errorMessages.forEach((message) => {
            toast.error(message);
          });
        });
      } else {
        toast.error("An error occurred. Please try again.");
      }
    },
  });
  const onSubmit = (data) => {
      const newData = {...data,email,token}
      mutation.mutate(newData);
  };
  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "gray.900",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: "100%",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Set new password
        </Typography>
        {resetMessage && (
          <Alert
            severity="success"
            sx={{
              border: "2px solid green",
              borderRadius: "8px",
              my: 2,
            }}
          >
            {resetMessage}
          </Alert>
        )}
        <Typography variant="p">
          Your new password must be different to previously used passwords.
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* password Field */}
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Password is required",
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
                fullWidth
                placeholder="New password"
                margin="normal"
                InputLabelProps={{ sx: { color: "gray.400" } }}
                InputProps={{
                  className: "text-white bg-gray-800",
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
          <Controller
            name="password_confirmation"
            control={control}
            defaultValue=""
            rules={{
              required: "Password confirmation is required",
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
                fullWidth
                placeholder="Password confirmation"
                margin="normal"
                InputLabelProps={{ sx: { color: "gray.400" } }}
                InputProps={{
                  className: "text-white bg-gray-800",
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
            Reset password
          </Button>
        </form>
        <br />
        <br />
        <Divider />
        <Typography
          variant="body2"
          sx={{
            textAlign: "left",
            mt: 2,
            color: "gray.600",
          }}
        >
          <Link to="/" style={{ textDecoration: "underline" }}>
            Back to Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
