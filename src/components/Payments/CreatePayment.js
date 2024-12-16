import { Button, Grid, InputAdornment, TextField } from "@mui/material";
// import Image from "../Image";
// import paymentImage from "../../assets/payment-page.jpg";
import { Controller, useForm } from "react-hook-form";
import EmailIcon from "@mui/icons-material/Email";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SendIcon from "@mui/icons-material/Send";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { handleValidationErrors } from "../../utiles/errorHandle";
import { makePaymentRequest } from "../../hooks/react-query/payment";

function CreatePayment({handleNext}) {
  const { control, handleSubmit } = useForm();
  const mutation = useMutation({
    mutationFn: makePaymentRequest,
    retry: 1,
    onSuccess: (data) => {
      handleNext()
      localStorage.setItem("paymentToken", data);
      toast.success("Payment created successfully.");
    },
    onError: (error) => {
      handleValidationErrors(error);
    },
  });
  const onSubmit = (data) => {
    mutation.mutate(data);
  };
  return (
    <Grid container spacing={2} padding={2}>
      {/* <Grid item xs={12} md={6}>
        <Image style={{ borderRadius: "25px" }} src={paymentImage} />
      </Grid> */}
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          width: "100%",
          margin: "auto",
          padding: 3,
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* name Field */}
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{
              required: "Full name is required",
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="text"
                variant="outlined"
                placeholder="Full Name"
                fullWidth
                margin="normal"
                InputProps={{
                  className: "text-white bg-gray-800",
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermIdentityIcon style={{ color: "gray" }} />
                    </InputAdornment>
                  ),
                }}
                error={!!error}
                helperText={error ? error.message : ""}
              />
            )}
          />
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
          <Controller
            name="amount"
            control={control}
            defaultValue=""
            rules={{
              required: "Amount is required",
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="number"
                variant="outlined"
                placeholder="Enter amount"
                fullWidth
                margin="normal"
                InputProps={{
                  className: "text-white bg-gray-800",
                  startAdornment: (
                    <InputAdornment position="start">
                      <MonetizationOnIcon style={{ color: "gray" }} />
                    </InputAdornment>
                  ),
                }}
                error={!!error}
                helperText={error ? error.message : ""}
              />
            )}
          />
          <Controller
            name="referencce"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="text"
                variant="outlined"
                placeholder="Reference (optional)"
                fullWidth
                margin="normal"
                InputProps={{
                  className: "text-white bg-gray-800",
                  startAdornment: (
                    <InputAdornment position="start">
                      <SendIcon style={{ color: "gray" }} />
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
            Submit
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default CreatePayment;
