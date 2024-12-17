import { useQuery } from "@tanstack/react-query";
import { getAPaymentRequest } from "../../hooks/react-query/payment";
import ProgressBar from "../ProgressBar";
import { Box, Button, Typography } from "@mui/material";
import CustomTabComponent from "../CustomTab";
import { useAddonSettings } from "../../hooks/react-query/settings";
import Image from "../Image";
import { useSettings } from "../../hooks/react-query/role-permission";

function SelectMethod({handleNext}) {
  document.title = "Select Payment Method"
  const { data, isLoading, error } = useQuery({
    queryKey: ["getAPayment"],
    queryFn: () => getAPaymentRequest(localStorage.getItem("paymentToken")),
  });
  const { data: addonData, isLoading: addonLoading } = useAddonSettings();
  const { data: settings } = useSettings();
  if (error) {
    return (
      <Typography sx={{ textAlign: "center" }}>
        {error.message || "Error"}
      </Typography>
    );
  }
  const verifyToPayment = (gateway) => {
    localStorage.setItem("gateway",gateway)
    localStorage.setItem("amount_to_pay",data.amount)
    handleNext()
  }
  if (isLoading || addonLoading) {
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
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Box sx={{ maxWidth: "100px" }}>
          <Image src={settings.logo} alt="Logo" width={80} height={80} />
        </Box>
        <Box sx={{ ml: 2 }}>
          <Typography variant="h6">{settings.business_name}</Typography>
        </Box>
      </Box>
      <CustomTabComponent
        tabs={[
          {
            label: "MOBILE BANKING",
            content: (
              <Box
                sx={{
                  display: "flex",
                }}
              >
                {Object.entries(addonData)
                  .filter(([method, details]) => details.type === "mobile_bank")
                  .map(([method, details]) => (
                    <Box
                    
                      key={method}
                      onClick={() => verifyToPayment(method)}
                      sx={{ border: "1px solid #ccc", marginRight: "6px",cursor : "pointer" }}
                    >
                      <Image
                        src={details.logo_url}
                        alt={method}
                        style={{
                          width: "140px",
                        }}
                      />
                    </Box>
                  ))}
              </Box>
            ),
          },
          {
            label: "BANK TRANSFER",
            content: (
              <Box
                sx={{
                  display: "flex",
                }}
              >
                {Object.entries(addonData)
                  .filter(([method, details]) => details.type === "bank")
                  .map(([method, details]) => (
                    <Box
                      key={method}
                      onClick={() => verifyToPayment(method)}
                      sx={{ border: "1px solid #ccc", marginRight: "6px",  cursor : "pointer"}}
                    >
                      <Image
                        src={details.logo_url}
                        alt={method}
                        style={{
                          width: "160px",
                        }}
                      />
                    </Box>
                  ))}
              </Box>
            ),
          },
        ]}
      />
      <Button sx={{ my: 2 }} fullWidth>
        Pay {data.amount} BDT
      </Button>
    </Box>
  );
}

export default SelectMethod;
