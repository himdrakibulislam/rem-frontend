import { Box, Card, CardContent, Typography } from "@mui/material";
function InfoCard({ title, icon, infoNumber }) {
  return (
    <Card>
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h5">{title}</Typography>
          <Typography variant="h6">{icon}</Typography>
        </Box>

        {/* Bottom Row with Revenue */}
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {infoNumber}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoCard;
