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
import { useDashboardStatistics } from "../hooks/react-query/auth";
import ProgressBar from "../components/ProgressBar";
import { formatCurrency } from "../utiles/functions";
import { useSettings } from "../hooks/react-query/role-permission";
import MyProperties from "../components/MyPropertiesTab";
function Dashboard() {
  const { hasPermission,hasRole } = useAuth();
  const { data, isLoading } = useDashboardStatistics({enabled : hasPermission("dashboard_statistics") });
  const { data: settings } = useSettings();
  if (isLoading) {
    return <ProgressBar />;
  }


  const dashboardData = [
    {
      title: "Total Properties",
      icon: <ApartmentIcon />,
      info: data?.total_properties || 0,
    },
    {
      title: "Total Flats",
      icon: <AddHomeIcon />,
      info: data?.total_flats || 0,
    },
    {
      title: "Total Customers",
      icon: <PeopleIcon />,
      info: data?.total_customers || 0,
    },
    {
      title: "Total Revinue",
      icon: <AttachMoneyIcon />,
      info: formatCurrency(
        settings.currency,
        parseFloat(data?.total_revenue || 0).toLocaleString()
      ),
    },
  ];
  return (
    <>
      <Typography sx={{ fontWeight: "bold", my: 2 }} variant="h5">
        {hasPermission("dashboard_statistics") && "Admin"} Dashboard
      </Typography>
      {hasPermission("dashboard_statistics") && (
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
      )}

      <Box sx={{ my: 2 }}>
        {hasRole('User') ? <MyProperties/> : 
        
        <CustomTabComponent
          width="0"
          tabs={[
            {
              label: "Projects",
              content: <PropertyList />,
            },
            {
              label: "Flats",
              content: <FlatList />,
            },
            hasPermission("users_list") && {
              label: "Customers",
              content: <UserTable />,
            },
            hasPermission('manage_payments') && 
            {
              label: "Payments",
              content: <PaymentList />,
            },
          ].filter(Boolean)}
        />
        }
      </Box>
    </>
  );
}

export default Dashboard;
