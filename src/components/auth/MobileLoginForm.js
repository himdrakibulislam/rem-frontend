import { Box, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import { useForm, Controller } from 'react-hook-form';


function MobileLoginForm() {
  
  const { control, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="mobile"
        control={control}
        defaultValue=""
        rules={{ required: "Mobile number is required" }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            type="number"
            variant="outlined"
            fullWidth
            placeholder="Enter your mobile number"
            margin="normal"
            InputLabelProps={{ sx: { color: "gray.400" } }}
            InputProps={{
              className: "text-white bg-gray-800",
              startAdornment: (
                <PhoneIcon position="start" style={{ color: "gray" }} />
              ),
            }}
            error={!!error}
            helperText={error ? error.message : ''}
          />
        )}
      />
       {/* OTP Field */}
       <Controller
        name="otp"
        control={control}
        defaultValue=""
        rules={{ required: "OTP is required" }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            type="text"
            variant="outlined"
            fullWidth
            placeholder="Enter OTP"
            margin="normal"
            InputLabelProps={{ sx: { color: "gray.400" } }}
            error={!!error}
            helperText={error ? error.message : ''}
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
        Log In With OTP
      </Button>
    </form>
  );
}
export default MobileLoginForm;
