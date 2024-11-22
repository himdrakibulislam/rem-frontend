import { Box, Grid, Typography } from "@mui/material";
import CustomTabComponent from "../../components/CustomTab";
import InfoCard from "../../components/InfoCard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAPropertyRequest } from "../../hooks/react-query/property";
import DataTable from "../../components/TableData";
import {
  flatColumns,
  flatRenderActions,
  flatStatusStyles,
} from "../../components/FlatList";
import ProgressBar from "../../components/ProgressBar";

export default function GetAProperty() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["getAProperty", id], // Include `id` as a dependency
    queryFn: () => getAPropertyRequest(id), // Call the function with `id`
    keepPreviousData: true,
  });
  const dashboardData = [
    {
      title: "Total Flats",
      icon: <ApartmentIcon />,
      info: 67,
    },
    {
      title: "Available Flats",
      icon: <ApartmentIcon />,
      info: 52,
    },
    {
      title: "Sold Flats",
      icon: <ApartmentIcon />,
      info: 52,
    },
    {
      title: "Total Customers",
      icon: <PersonOutlinedIcon />,
      info: 53,
    },
  ];
  if (isLoading) return <ProgressBar />;
  if (error) return <div>Error loading properties!</div>;
  
  return (
    <Box>
      <Typography variant="h5">{data.name}</Typography>
      <Grid
        container
        rowSpacing={2}
        sx={{ my: 2 }}
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
      >
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
      <CustomTabComponent
        tabs={[
          {
            label: "Flats",
            content: (
              <>
              {data.flats.length > 0 ? 
              <DataTable
              title="Flats"
              columns={flatColumns}
              data={data.flats}
              actions={flatRenderActions}
              // onAddClick={handleAddFlat}
              // currency={settings.currency}
              getStatusStyles={flatStatusStyles}
            />
              :  
              <Typography variant="h5" >Empty</Typography>
              }
              </>
            ),
          },
          {
            label: "Customers",
            content: "Customers",
          },
        ]}
      />
    </Box>
  );
}
