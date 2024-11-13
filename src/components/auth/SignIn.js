import React from "react";
import { Container, Card, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CustomTabComponent from "../CustomTab";
import EmailLoginForm from "./EmailLoginForm";
import MobileLoginForm from "./MobileLoginForm";
export default function SignIn() {
  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card sx={{ bgcolor: "black" }}>
        <Box
          sx={{
            bgcolor: "gray.900",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            width: "100%",
          }}
        >
          <Typography variant="h5" component="h3" sx={{ fontWeight: "bold" }}>
            Login
          </Typography>
          <Typography variant="p" component="p" sx={{ mb: 2, color: "gray" }}>
            Choose your preferred login method
          </Typography>

          {/* Sign-In Form */}

          <CustomTabComponent
            tabs={[
              {
                label: "Email",
                content: <EmailLoginForm />,
              },
              {
                label: "Mobile OTP",
                content: <MobileLoginForm />,
              },
            ]}
          />
          {/* Sign-Up Link */}
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              mt: 2,
              color: "gray.400",
            }}
          >
            Don't have an account?{" "}
            <Link to="/sign-up" style={{ textDecoration: "underline" }}>
              Register here
            </Link>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
}
