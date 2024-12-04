import DashboardIcon from "@mui/icons-material/Dashboard";
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupIcon from '@mui/icons-material/Group';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';

export const DASHBOARD_NAVIGATION = [
  {
    path: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    path: "properties",
    title: "Properties",
    icon: <ApartmentIcon />,
  },
  {
    path: "flats",
    title: "Flats",
    icon: <HomeIcon />
  },
  {
    path: "payments",
    title: "Payments",
    icon: <PaymentIcon />,
    requiredPermissions: ["manage_payments"]
  },
  {
    path: "users-permission",
    title: "Users & Permissions",
    icon: <GroupIcon />,
    requiredPermissions: ["manage_role_permission","users_list"]
  },
  {
    path: "settings",
    title: "Settings",
    icon: <SettingsOutlinedIcon />
  }
];
