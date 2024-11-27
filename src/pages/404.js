import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
function NotFound() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        backgroundColor: "white",
        dark: { backgroundColor: "gray.900" },
        py: 8,
        px: 4,
        mx: "auto",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          mb: 4,
          fontSize: { xs: "7rem", lg: "9rem" },
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
        404
      </Typography>
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          fontWeight: "bold",
          color: "text.primary",
        }}
      >
        Something's missing.
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mb: 4,
          color: "text.secondary",
        }}
      >
        Sorry, we can't find that page. You'll find lots to explore on the home
        page.
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
          }}
          onClick={() => navigate(-1)}
        >
         <KeyboardBackspaceIcon/> back
        </Button>
        <Link to="/">
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
            }}
          >
            Back to Homepage
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default NotFound;
