import React from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  FormControl,
  MenuItem,
  Select,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerUserRequest } from "../../hooks/react-query/auth";
import { toast } from "react-toastify";
import WestIcon from '@mui/icons-material/West';

export default function SignUp() {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: registerUserRequest,
    retry: 1,
    onSuccess: (data) => {
      localStorage.setItem("token", data.access_token);
      navigate("/dashboard");
    },
    onError: (error) => {
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
    mutation.mutate(data);
  };
  return (
    <Container
      maxWidth="md"
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
        <Box sx={{my:1}}>
        <Link to="/">
          <WestIcon fontSize="small" /> Back To Login
        </Link>
        </Box>
    
        <Typography variant="h5" component="h3" sx={{ fontWeight: "bold" }}>
          User Registration
        </Typography>
        <Typography variant="p" component="p" sx={{ mb: 2, color: "gray" }}>
          Please fill in your details to register
        </Typography>

        {/* Sign-up Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* project type */}
            <Grid item xs={12} md={12}>
              <Controller
                name="client_type"
                control={control}
                defaultValue=""
                rules={{
                  required: "Client type is required",
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <FormControl component="fieldset" fullWidth error={!!error}>
                      <FormLabel component="legend">Client Type</FormLabel>
                      <RadioGroup
                        row
                        {...field} // Spread field to attach value and onChange
                      >
                        <FormControlLabel
                          value="Ongoing Project Client"
                          control={<Radio />}
                          label="Ongoing Project Client"
                        />
                        <FormControlLabel
                          value="Handed Over Project Client"
                          control={<Radio />}
                          label="Handed Over Project Client"
                        />
                        <FormControlLabel
                          value="tenant"
                          control={<Radio />}
                          label="Tenant"
                        />
                      </RadioGroup>
                      {error && (
                        <Typography color="error">{error.message}</Typography>
                      )}
                    </FormControl>
                  </>
                )}
              />
            </Grid>
            {/* full name */}
            <Grid item xs={12} md={6}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: "Fullname is required",
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Typography variant="body1" sx={{ my: 0, py: 0 }}>
                      Full Name
                    </Typography>
                    <TextField
                      {...field}
                      sx={{ my: 1, py: 0 }}
                      type="text"
                      variant="outlined"
                      placeholder="Enter your full name"
                      fullWidth
                      error={!!error}
                      helperText={error ? error.message : ""}
                    />
                  </>
                )}
              />
            </Grid>

            {/* spouse name Field */}
            <Grid item xs={12} md={6}>
              <Controller
                name="spouce_name"
                control={control}
                defaultValue=""
                rules={{ required: "Spouse name is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Typography variant="body1" sx={{ my: 0, py: 0 }}>
                      Spouse Name
                    </Typography>
                    <TextField
                      {...field}
                      sx={{ my: 1, py: 0 }}
                      type="text"
                      variant="outlined"
                      placeholder="Enter  spouse name"
                      fullWidth
                      error={!!error}
                      helperText={error ? error.message : ""}
                    />
                  </>
                )}
              />
            </Grid>
            {/* father name Field */}
            <Grid item xs={12} md={6}>
              <Controller
                name="father_name"
                control={control}
                defaultValue=""
                rules={{ required: "Father name is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Typography variant="body1" sx={{ my: 0, py: 0 }}>
                      Father's Name
                    </Typography>
                    <TextField
                      {...field}
                      sx={{ my: 1, py: 0 }}
                      type="text"
                      variant="outlined"
                      placeholder="Enter father's name"
                      fullWidth
                      error={!!error}
                      helperText={error ? error.message : ""}
                    />
                  </>
                )}
              />
            </Grid>
            {/* mother name Field */}
            <Grid item xs={12} md={6}>
              <Controller
                name="mother_name"
                control={control}
                defaultValue=""
                rules={{ required: "Mother name is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Typography variant="body1" sx={{ my: 0, py: 0 }}>
                      Mother's Name
                    </Typography>
                    <TextField
                      {...field}
                      sx={{ my: 1, py: 0 }}
                      type="text"
                      variant="outlined"
                      placeholder="Enter mother's name"
                      fullWidth
                      error={!!error}
                      helperText={error ? error.message : ""}
                    />
                  </>
                )}
              />
            </Grid>
            {/* nid no Field */}
            <Grid item xs={12} md={6}>
              <Controller
                name="nid_number"
                control={control}
                defaultValue=""
                rules={{ required: "NID No is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Typography variant="body1" sx={{ my: 0, py: 0 }}>
                      NID No
                    </Typography>
                    <TextField
                      {...field}
                      sx={{ my: 1, py: 0 }}
                      type="text"
                      variant="outlined"
                      placeholder="Enter NID number"
                      fullWidth
                      error={!!error}
                      helperText={error ? error.message : ""}
                    />
                  </>
                )}
              />
            </Grid>
            {/* passport no Field */}
            <Grid item xs={12} md={6}>
              <Controller
                name="passport_number"
                control={control}
                defaultValue=""
                rules={{ required: "Passport No is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Typography variant="body1" sx={{ my: 0, py: 0 }}>
                      Passport No
                    </Typography>
                    <TextField
                      {...field}
                      sx={{ my: 1, py: 0 }}
                      type="text"
                      variant="outlined"
                      placeholder="Enter passport numbre"
                      fullWidth
                      error={!!error}
                      helperText={error ? error.message : ""}
                    />
                  </>
                )}
              />
            </Grid>

            {/* dob Field */}
            <Grid item xs={12} md={6}>
              <Controller
                name="date_of_birth"
                control={control}
                defaultValue=""
                rules={{ required: "Date of Birth is required" }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Typography variant="body1" sx={{ mb: 0.5 }}>
                      Date of Birth
                    </Typography>
                    <TextField
                      onChange={onChange}
                      value={value}
                      sx={{ my: 1 }}
                      type="date"
                      variant="outlined"
                      fullWidth
                      error={!!error}
                      helperText={error ? error.message : ""}
                    />
                  </>
                )}
              />
            </Grid>
            {/* tin Field */}
            <Grid item xs={12} md={6}>
              <Controller
                name="tin_no"
                control={control}
                defaultValue=""
                rules={{ required: "TIN No is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Typography variant="body1" sx={{ my: 0, py: 0 }}>
                      TIN No
                    </Typography>
                    <TextField
                      {...field}
                      sx={{ my: 1, py: 0 }}
                      type="text"
                      variant="outlined"
                      placeholder="Enter TIN number"
                      fullWidth
                      error={!!error}
                      helperText={error ? error.message : ""}
                    />
                  </>
                )}
              />
            </Grid>
            {/* nominee Field */}
            <Grid item xs={12} md={6}>
              <Controller
                name="nominee_name"
                control={control}
                defaultValue=""
                rules={{ required: "Nominee name is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Typography variant="body1" sx={{ my: 0, py: 0 }}>
                      Nominee Name
                    </Typography>
                    <TextField
                      {...field}
                      sx={{ my: 1, py: 0 }}
                      type="text"
                      variant="outlined"
                      placeholder="Enter nominee name"
                      fullWidth
                      error={!!error}
                      helperText={error ? error.message : ""}
                    />
                  </>
                )}
              />
            </Grid>
            {/* relation with nominee Field */}
            <Grid item xs={12} md={6}>
              <Controller
                name="relation_with_nominee"
                control={control}
                defaultValue=""
                rules={{ required: "Relation with nominee is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Typography variant="body1" sx={{ my: 0, py: 0 }}>
                      Relation with nominee
                    </Typography>
                    <TextField
                      {...field}
                      sx={{ my: 1, py: 0 }}
                      type="text"
                      variant="outlined"
                      placeholder="Enter relation with nominee"
                      fullWidth
                      error={!!error}
                      helperText={error ? error.message : ""}
                    />
                  </>
                )}
              />
            </Grid>
            {/* nominee nid */}
            <Grid item xs={12} md={6}>
              <Controller
                name="nominee_nid"
                control={control}
                defaultValue=""
                rules={{ required: "Nominee NID  is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Typography variant="body1" sx={{ my: 0, py: 0 }}>
                      Nominee NID
                    </Typography>
                    <TextField
                      {...field}
                      sx={{ my: 1, py: 0 }}
                      type="text"
                      variant="outlined"
                      placeholder="Enter nominee NID number"
                      fullWidth
                      error={!!error}
                      helperText={error ? error.message : ""}
                    />
                  </>
                )}
              />
            </Grid>
            {/* nationality */}
            <Grid item xs={12} md={6}>
              <Controller
                name="nationality"
                control={control}
                defaultValue=""
                rules={{ required: "Nationality  is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Typography variant="body1" sx={{ my: 0, py: 0 }}>
                      Nationality
                    </Typography>
                    <TextField
                      {...field}
                      sx={{ my: 1, py: 0 }}
                      type="text"
                      variant="outlined"
                      placeholder="Enter nationality"
                      fullWidth
                      error={!!error}
                      helperText={error ? error.message : ""}
                    />
                  </>
                )}
              />
            </Grid>
            {/* duel citizenship */}
            <Grid item xs={12} md={6}>
              <Controller
                name="duel_citizenship"
                control={control}
                defaultValue=""
                rules={{ required: "Duel Citizenship  is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Typography variant="body1" sx={{ my: 0, py: 0 }}>
                      Duel Citizenship
                    </Typography>
                    <TextField
                      {...field}
                      sx={{ my: 1, py: 0 }}
                      type="text"
                      variant="outlined"
                      placeholder="Enter duel citizenship (if any)"
                      fullWidth
                      error={!!error}
                      helperText={error ? error.message : ""}
                    />
                  </>
                )}
              />
            </Grid>
            {/* contact */}
            <Grid item xs={12} md={6}>
              <Controller
                name="contact"
                control={control}
                defaultValue=""
                rules={{ required: "Contact  is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Typography variant="body1" sx={{ my: 0, py: 0 }}>
                      Contact No
                    </Typography>
                    <TextField
                      {...field}
                      sx={{ my: 1, py: 0 }}
                      type="text"
                      variant="outlined"
                      placeholder="Enter contact number"
                      fullWidth
                      error={!!error}
                      helperText={error ? error.message : ""}
                    />
                  </>
                )}
              />
            </Grid>
            {/* email */}
            <Grid item xs={12} md={6}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "Email  is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Typography variant="body1" sx={{ my: 0, py: 0 }}>
                      E-mail
                    </Typography>
                    <TextField
                      {...field}
                      sx={{ my: 1, py: 0 }}
                      type="email"
                      variant="outlined"
                      placeholder="Enter email address"
                      fullWidth
                      error={!!error}
                      helperText={error ? error.message : ""}
                    />
                  </>
                )}
              />
            </Grid>
            {/* profession */}
            <Grid item xs={12} md={6}>
              <Controller
                name="profession"
                control={control}
                defaultValue=""
                rules={{ required: "Profession  is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Typography variant="body1" sx={{ my: 0, py: 0 }}>
                      Profession
                    </Typography>
                    <TextField
                      {...field}
                      sx={{ my: 1, py: 0 }}
                      type="text"
                      variant="outlined"
                      placeholder="Enter profession"
                      fullWidth
                      error={!!error}
                      helperText={error ? error.message : ""}
                    />
                  </>
                )}
              />
            </Grid>
            {/* company name */}
            <Grid item xs={12} md={6}>
              <Controller
                name="company_name"
                control={control}
                defaultValue=""
                rules={{ required: "Company name  is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Typography variant="body1" sx={{ my: 0, py: 0 }}>
                      Company Name
                    </Typography>
                    <TextField
                      {...field}
                      sx={{ my: 1, py: 0 }}
                      type="text"
                      variant="outlined"
                      placeholder="Enter company name"
                      fullWidth
                      error={!!error}
                      helperText={error ? error.message : ""}
                    />
                  </>
                )}
              />
            </Grid>
            {/* company address */}
            <Grid item xs={12} md={6}>
              <Controller
                name="company_address"
                control={control}
                defaultValue=""
                rules={{ required: "Company address is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Typography variant="body1" sx={{ my: 0, py: 0 }}>
                      Company Address
                    </Typography>
                    <TextField
                      {...field}
                      multiline
                      rows={2} // Number of visible rows
                      variant="outlined"
                      fullWidth // Make it take the full width of its container
                      placeholder="Enter company address"
                      error={!!error} // Shows the error state if there's an error
                      helperText={error ? error.message : ""} // Displays error message
                    />
                  </>
                )}
              />
            </Grid>
            {/* company contact */}
            <Grid item xs={12} md={6}>
              <Controller
                name="company_contact"
                control={control}
                defaultValue=""
                rules={{ required: "Company contact is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Typography variant="body1" sx={{ my: 0, py: 0 }}>
                      Company Contact
                    </Typography>
                    <TextField
                      {...field}
                      sx={{ my: 1, py: 0 }}
                      type="text"
                      variant="outlined"
                      placeholder="Enter company contact"
                      fullWidth
                      error={!!error}
                      helperText={error ? error.message : ""}
                    />
                  </>
                )}
              />
            </Grid>
            {/* present address */}
            <Grid item xs={12} md={6}>
              <Controller
                name="present_address"
                control={control}
                defaultValue=""
                rules={{ required: "Present address is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Typography variant="body1" sx={{ my: 0, py: 0 }}>
                      Present Address
                    </Typography>
                    <TextField
                      {...field}
                      multiline
                      rows={2} // Number of visible rows
                      variant="outlined"
                      fullWidth // Make it take the full width of its container
                      placeholder="Enter present address"
                    />
                  </>
                )}
              />
            </Grid>
            {/* permanent */}
            <Grid item xs={12} md={12}>
              <Controller
                name="permanent_address"
                control={control}
                defaultValue=""
                rules={{ required: "Permanent address is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Typography variant="body1" sx={{ my: 0, py: 0 }}>
                      Permanent Address
                    </Typography>
                    <TextField
                      {...field}
                      multiline
                      rows={2} // Number of visible rows
                      variant="outlined"
                      fullWidth // Make it take the full width of its container
                      placeholder="Enter present address"
                    />
                  </>
                )}
              />
            </Grid>
            {/* project */}
            <Grid item xs={12} md={6}>
              <Controller
                name="project"
                control={control}
                defaultValue=""
                rules={{ required: "Project selection is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Typography variant="body1" sx={{ my: 0, py: 0 }}>
                      Select Project
                    </Typography>
                    <FormControl fullWidth variant="outlined" error={!!error}>
                      <Select {...field} displayEmpty>
                      <MenuItem value="">
                          <em>Select an option</em>
                        </MenuItem>
                        <MenuItem value="option1">Option 1</MenuItem>
                        <MenuItem value="option2">Option 2</MenuItem>
                        <MenuItem value="option3">Option 3</MenuItem>
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
            </Grid>
            {/* flat */}
            <Grid item xs={12} md={6}>
              <Controller
                name="flat"
                control={control}
                defaultValue=""
                rules={{ required: "Flat is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Typography variant="body1" sx={{ my: 0, py: 0 }}>
                      Select Flat
                    </Typography>
                    <FormControl fullWidth variant="outlined" error={!!error}>
                      <Select
                        {...field} // Bind field properties to Select
                        displayEmpty
                      >
                        <MenuItem value="">
                          <em>Select an option</em>
                        </MenuItem>
                        <MenuItem value="option1">Option 1</MenuItem>
                        <MenuItem value="option2">Option 2</MenuItem>
                        <MenuItem value="option3">Option 3</MenuItem>
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
            </Grid>
            <Grid item xs={12} md={6}>
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
                  <>
                    <Typography variant="body1" sx={{ my: 0, py: 0 }}>
                      password
                    </Typography>
                    <TextField
                      {...field}
                      type="password"
                      variant="outlined"
                      fullWidth
                      placeholder="Password"
                      margin="normal"
                      error={!!error}
                      helperText={error ? error.message : ""}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Password confirmation Field */}
              <Controller
                name="password_confirmation"
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
                  <>
                    <Typography variant="body1" sx={{ my: 0, py: 0 }}>
                      Password confirmation
                    </Typography>
                    <TextField
                      {...field}
                      type="password"
                      variant="outlined"
                      fullWidth
                      placeholder="Password"
                      margin="normal"
                      error={!!error}
                      helperText={error ? error.message : ""}
                    />
                  </>
                )}
              />
            </Grid>
          </Grid>

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
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
}
