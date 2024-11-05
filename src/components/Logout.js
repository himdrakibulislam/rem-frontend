import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { logoutRequest } from "../hooks/react-query/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      navigate("/");
      window.location.reload();
    },
    onError: (error) => {
      toast.error("Failed to log out.");
    },
  });

  const handleLogout = () => {
    mutation.mutate(); // Trigger the logout request
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={mutation.isLoading}
      style={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Customize shadow here
        transition: "box-shadow 0.3s ease-in-out",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
      }}
    >
      <LogoutIcon />
      {mutation.isLoading ? "Logging out..." : " Log out"}
    </Button>
  );
};

export default Logout;
