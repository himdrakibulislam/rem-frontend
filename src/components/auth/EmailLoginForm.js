import { Box, Button, InputAdornment, TextField } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import {  loginWithEmailRequest } from "../../hooks/react-query/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

function EmailLoginForm() {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();
  const mutation = useMutation({
    mutationFn: loginWithEmailRequest,
    retry: 1,
    onSuccess: (data) => {
      localStorage.setItem("token", data.access_token);
      navigate('/dashboard'); 
    },
    onError: (error) => {
      toast.error(error.response.data)
    },
  });
  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
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

      {/* Password Field */}
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
            placeholder="Password"
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
      {/* Forgot Password Link */}
      <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
        <Link
          to="/forgot-password"
          style={{
            color: "#b0b0b0",
            fontSize: "0.875rem",
            textDecoration: "underline",
          }}
        >
          Forgot Password?
        </Link>
      </Box>

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
        Sign In
      </Button>
    </form>
  );
}

export default EmailLoginForm;
