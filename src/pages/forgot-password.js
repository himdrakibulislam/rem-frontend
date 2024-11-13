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
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";
import { ForgotPasswordRequest } from "../hooks/react-query/auth";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function ForgotPassword() {
  const { control, handleSubmit } = useForm();
  const [resetMessage, setResetMessage] = useState("");
  const mutation = useMutation({
    mutationFn: ForgotPasswordRequest,
    retry: 1,
    onSuccess: (data) => {
      setResetMessage(data);
    },
    onError: (error) => {
      setResetMessage("");
      toast.error(error.response.data.email.toString());
    },
  });
  const onSubmit = (data) => {
    mutation.mutate(data);
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
          Forgot password
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
          Lost your password? Please enter your email address. You will receive
          a link to create a new password via email.
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="email"
                variant="outlined"
                placeholder="Enter your e-mail"
                fullWidth
                margin="normal"
                InputProps={{
                  className: "text-white bg-gray-800",
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon style={{ color: "gray" }} />
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
          Remembered your password ?
          <Link to="/" style={{ textDecoration: "underline" }}>
            Sign in
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
