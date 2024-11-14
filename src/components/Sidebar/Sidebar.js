import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import logo from "../../assets/logo.png";
import { Link, Outlet, useLocation } from "react-router-dom";
import DashboardAppBar from "../AppBar";
import { DASHBOARD_NAVIGATION } from "../../data/dashboardnav";
import { useAuth } from "../../context/AuthContext";
const drawerWidth = 240;

function AdminSideBar(props) {
  const { window } = props;
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const { hasRole, hasPermission } = useAuth();
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar
        children={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
              backgroundColor: "#f5f5f5", // Light background color
              borderRadius: 2, // Rounded corners
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
              maxWidth: 120, // Limit width for compact look
              margin: "auto",
            }}
          >
            <img src={logo} alt="logo" width={100} height={100} />
          </Box>
        }
      />
      <Divider />
      <List>
        {DASHBOARD_NAVIGATION.map((nav, index) => {
          const hasAccess =
            (!nav.requiredRoles ||
              nav.requiredRoles.some((role) => hasRole(role))) &&
            (!nav.requiredPermissions ||
              nav.requiredPermissions.some((permission) =>
                hasPermission(permission)
              ));
          // Render the item only if the user has access
          if (!hasAccess) return null;
          const isSelected = location.pathname === `/${nav.path}`;
          return (
            <ListItem key={index} disablePadding>
              <ListItemButton
                selected={isSelected}
                component={Link}
                to={nav.path}
              >
                <ListItemIcon>{nav.icon}</ListItemIcon>
                <ListItemText primary={nav.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      {/* <Divider /> */}
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <DashboardAppBar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

AdminSideBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default AdminSideBar;
