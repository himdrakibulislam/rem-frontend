import DashboardIcon from "@mui/icons-material/Dashboard";
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupIcon from '@mui/icons-material/Group';

export const DASHBOARD_NAVIGATION = [
  {
    path: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
    // requiredRoles: ["CEO", "Manager"]
  },
  {
    path: "properties",
    title: "Properties",
    icon: <ApartmentIcon />,
    requiredPermissions: ["view_properties"]
  },
  {
    path: "users-permission",
    title: "Users & Permissions",
    icon: <GroupIcon />,
    // requiredPermissions: ["user"]
  },
];
