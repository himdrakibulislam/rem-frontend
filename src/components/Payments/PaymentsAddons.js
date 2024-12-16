import { Box, Grid } from "@mui/material";
import { useAddonSettings } from "../../hooks/react-query/settings";
import ProgressBar from "../ProgressBar";
import BkashForm from "./BkashFrom";

function PaymentsAddons() {
  const { data, isLoading } = useAddonSettings();
  if (isLoading) {
    return <ProgressBar />;
  }
  return (
    <Grid container spacing={2}>
      <Grid marginTop={2} item xs={12} sm={12} lg={6}>
        <Box
          sx={{
            margin: "auto",
            padding: 3,
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <BkashForm defaultValues={data?.bkash} gateway="bkash" />
        </Box>
      </Grid>
      <Grid marginTop={2} item xs={12} sm={12} lg={6}>
        <Box
          sx={{
            margin: "auto",
            padding: 3,
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <BkashForm defaultValues={data?.nagod} gateway="nagod" />
        </Box>
      </Grid>
    </Grid>
  );
}

export default PaymentsAddons;
