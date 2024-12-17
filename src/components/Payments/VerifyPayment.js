import { Box, Button, TextField, Typography } from "@mui/material";
import { useAddonSettings } from "../../hooks/react-query/settings";
import ProgressBar from "../ProgressBar";
import { useEffect, useState } from "react";
import { useSettings } from "../../hooks/react-query/role-permission";
import { Controller, useForm } from "react-hook-form";
import { handleValidationErrors } from "../../utiles/errorHandle";
import { useMutation } from "@tanstack/react-query";
import { verifyPaymentRequest } from "../../hooks/react-query/payment";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyPayment({handleNext}) {
  document.title = "Verify Payment";
  const [gateway, setGateway] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const [amountToPay, setAmountToPay] = useState(0);
  const { data: addonData, isLoading: addonLoading } = useAddonSettings();
  const { data: settings } = useSettings();
  useEffect(() => {
    setGateway(addonData[localStorage.getItem("gateway")]);
    setAmountToPay(localStorage.getItem("amount_to_pay"));
  }, [addonData, amountToPay]);
  const { control, handleSubmit } = useForm();
  const mutation = useMutation({
    mutationFn: verifyPaymentRequest,
    retry: 1,
    onSuccess: (data) => {
      toast.success("Thank you for submitting.");
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("trxID", data.transaction_id );
      searchParams.set("pm", data.payment_method);
      searchParams.set("amount", data.amount);
      searchParams.set("status", data.status);
      navigate(`?${searchParams.toString()}`, { replace: true });
      localStorage.removeItem("paymentToken");
      localStorage.removeItem("gateway");
      localStorage.removeItem("amount_to_pay");
      handleNext()
    },
    onError: (error) => {
      toast.error(error.response.data);
      handleValidationErrors(error);
    },
  });
  const onSubmit = (data) => {
    const token = localStorage.getItem("paymentToken");
    const payment_method = localStorage.getItem("gateway");
    const newData = { ...data, token, payment_method };
    mutation.mutate(newData);
  };
  if (addonLoading) {
    return <ProgressBar />;
  }
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "40%" },
        margin: "auto",
        padding: 3,
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img
            src={gateway.logo_url}
            alt="Logo"
            style={{ maxWidth: "130px", display: "block" }}
          />
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "700",
                color: "#9e9e9e",
                borderColor: "#9e9e9e",
                border: 2,
                borderRadius: 1,
                padding: 1,
              }}
            >
              {settings.currency} {amountToPay}
            </Typography>
          </Box>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            style={{
              backgroundColor: gateway.theme_color,
              color: "white",
              width: "100%",
              borderRadius: "4px",
              marginTop: "7px",
              padding: "6px 8px",
            }}
          >
            <Controller
              name="transaction_id"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  variant="outlined"
                  placeholder="Enter Transaction ID"
                  fullWidth
                  margin="normal"
                />
              )}
            />

            {/* Sign In Button */}

            <div
              style={{ textAlign: "left" }}
              dangerouslySetInnerHTML={{ __html: gateway.payment_instructions }}
            ></div>
          </div>
          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 2,
              backgroundImage: `linear-gradient(to right, ${gateway.theme_color}, ${gateway.theme_color})`, // Linear gradient
              color: "white",
              ":hover": {
                color: "white",
              },
            }}
          >
            Verify
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default VerifyPayment;
