// pages/Dashboard.js
import React from "react";
import Typography from "@mui/material/Typography";
import { useAuth } from "../context/AuthContext";
import { Box } from "@mui/material";

function Dashboard() {
  const { user } = useAuth();
  return (
    <Box>
      <Typography sx={{ my: 2 }} variant="h4">
        Welcome , {user.name}{" "}
      </Typography>
    </Box>
  );
}

export default Dashboard;
