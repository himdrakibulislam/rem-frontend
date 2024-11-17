import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Grid } from "@mui/material";
import InfoCard from "../components/InfoCard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AddHomeIcon from "@mui/icons-material/AddHome";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CustomTabComponent from "../components/CustomTab";
import AddIcon from '@mui/icons-material/Add';
import {Link} from "react-router-dom"
function Dashboard() {
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
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const rows = [
    createData("Sunset Villa", "123 Ocean View, Beachtown", 6.0, 24, "Edit"),
    createData("Mountain Retreat", "456 Pine Road, Hillsville", 9.0, 37, "Edit"),
  ];

  return (
    <>
      <Typography sx={{ fontWeight: "bold", my: 2 }} variant="h5">
        Admin Dashboard
      </Typography>

      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        {dashboardData.map((data, index) => (
          <Grid key={index} item xs={12} sm={6} md={3} >
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
              content: (
                <Box>
                  <Box sx={{display : "flex", justifyContent : "space-between",my:2}}><Typography variant="h4" sx={{fontWeight:"bold"}}>Projects</Typography>
                  <Box><Button> <AddIcon/> Add Property</Button></Box>
                  </Box>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell >Address</TableCell>
                          <TableCell>Total Flats</TableCell>
                          <TableCell >Availablle Flats</TableCell>
                          <TableCell >Action </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row,index) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              <Link to={`/property/${++index}`}>{row.name}</Link>
                            </TableCell>
                            <TableCell >{row.calories}</TableCell>
                            <TableCell >{row.fat}</TableCell>
                            <TableCell >{row.carbs}</TableCell>
                            <TableCell >
                              <Button size="small" sx={{backgroundColor :"white"}}>Edit</Button>
                  
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              ),
            },
            {
              label: "Flats",
              content: <Typography>Flats</Typography>,
            },
            {
              label: "Customers",
              content: <Typography>Customers</Typography>,
            },
            {
              label: "Payments",
              content: <Typography>Payments</Typography>,
            },
          ]}
        />
      </Box>
    </>
  );
}

export default Dashboard;
