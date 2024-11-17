import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomTabComponent from "../../components/CustomTab";
import InfoCard from "../../components/InfoCard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Link, useParams } from "react-router-dom";

export default function GetAProperty() {
    const { id } = useParams();
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
        }
      ];
  function createData(name, size, price, status) {
    return { name, size, price, status };
  }
  const rows = [
    createData("Flat 101", "1290 sq ft", 436.0, "Sold"),
    createData("Flat 102", "1390 sq ft", 536.0, "Available"),
  ];
  return (
    <Box>
        <Typography variant="h5">
            Sunset Villa
        </Typography>
        <Grid container rowSpacing={2} sx={{my:2}} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
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
      <CustomTabComponent
        tabs={[
          {
            label: "Flats",
            content: (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    my: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Flats
                  </Typography>
                  <Box>
                    <Button>
                      <AddIcon /> Add Flat
                    </Button>
                  </Box>
                </Box>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, index) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell>{row.size}</TableCell>
                          <TableCell>${row.price}</TableCell>
                          <TableCell>{row.status}</TableCell>
                          <TableCell>
                           <Link to={`/property/${id}/flat/${++index}`}>
                              View Details
                           </Link>
                           
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ),
          },
          {
            label : "Customers",
            content : "Customers"
          }
        ]}
      />
    </Box>
  );
}
