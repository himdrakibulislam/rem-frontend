import { Box, Button, Grid, Typography } from "@mui/material";
import { useAddonSettings } from "../../hooks/react-query/settings";
import ProgressBar from "../ProgressBar";
import BkashForm from "./BkashFrom";
import AddIcon from '@mui/icons-material/Add';

function PaymentsAddons() {
  const { data, isLoading } = useAddonSettings();
  if (isLoading) {
    return <ProgressBar />;
  }
  return (
    <Grid container spacing={2}>
      <Grid
        marginTop={2}
        item
        xs={12}
        sm={12}
        lg={12}
        container
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography sx={{ mx: 2 }} variant="h6">
          Mobile Banking
        </Typography>
        <Button> <AddIcon/> Add New</Button>
      </Grid>
      {Object.entries(data)
        .filter(([key, value]) => value.type === "mobile_bank")
        .map(([key, value]) => (
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
              <BkashForm defaultValues={value} gateway={value} />
            </Box>
          </Grid>
        ))}

      <Grid marginTop={2} item xs={12} sm={12} lg={12}>
        <Typography sx={{ mx: 2 }} variant="h6">
          Bank Details
        </Typography>
      </Grid>
      {Object.entries(data)
        .filter(([key, value]) => value.type === "bank")
        .map(([key, value]) => (
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
              <BkashForm defaultValues={value} isBank gateway={value} />
            </Box>
          </Grid>
        ))}
    </Grid>
  );
}

export default PaymentsAddons;
