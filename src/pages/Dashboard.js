import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import InfoCard from "../components/InfoCard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AddHomeIcon from "@mui/icons-material/AddHome";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CustomTabComponent from "../components/CustomTab";

import { useAuth } from "../context/AuthContext";
import UserTable from "../components/UserTable";
import PropertyList from "../components/PropertyList";
import FlatList from "../components/FlatList";
import PaymentList from "../components/PaymentList";
function Dashboard() {
  const { hasPermission } = useAuth();
  const dashboardData = [
    {
      title: "Total Properties",
      icon: <ApartmentIcon />,
      info: 67,
    },
    {
      title: "Total Flats",
      icon: <AddHomeIcon />,
      info: 52,
    },
    {
      title: "Total Customers",
      icon: <PeopleIcon />,
      info: 53,
    },
    {
      title: "Total Revinue",
      icon: <AttachMoneyIcon />,
      info: 1200,
    },
  ];

  return (
    <>
      <Typography sx={{ fontWeight: "bold", my: 2 }} variant="h5">
        Admin Dashboard
      </Typography>

      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        {dashboardData.map((data, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <InfoCard
              icon={data.icon}
              infoNumber={data.info}
              title={data.title}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ my: 2 }}>
        <CustomTabComponent
          width="0"
          tabs={[
            {
              label: "Projects",
              content: <PropertyList />,
            },
            {
              label: "Flats",
              content: <FlatList/>,
            },
            hasPermission("users_list") && {
              label: "Customers",
              content: <UserTable />,
            },
            {
              label: "Payments",
              content: <PaymentList/>,
            },
          ].filter(Boolean)}
        />
      </Box>
    </>
  );
}

export default Dashboard;
