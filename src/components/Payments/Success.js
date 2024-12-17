import { Box, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

function Success() {
  const [searchParams] = useSearchParams();
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
      <Typography variant="h6" sx={{ textAlign: "center", my: 2 }}>
        Thanks for your payment! Your payment is{" "}
        <span style={{ color: "#fb8c00" }}>Pending</span> for verification.
        please wait.
      </Typography>
      <hr />
      <Box>
        <table>
          <tr>
            <td style={{ fontWeight: "bold" }}>Payment Type </td>
            <td>: {searchParams.get("pm")}</td>
          </tr>
          <tr>
            <td> Transection Id </td>
            <td>: {searchParams.get("trxID")}</td>
          </tr>
          <tr>
            <td> Amount </td>
            <td>: {searchParams.get("amount")}</td>
          </tr>
          <tr>
            <td> Status </td>
            <td>
              :{" "}
              <span style={{ color: "#fb8c00" }}>
                 {searchParams.get("status")}
              </span>
            </td>
          </tr>
        </table>
      </Box>
    </Box>
  );
}

export default Success;
