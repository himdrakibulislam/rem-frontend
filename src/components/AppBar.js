import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Box,
} from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import { useAuth } from "../context/AuthContext";
import LogOut from "./Logout";

function DashboardAppBar({ drawerWidth, handleDrawerToggle }) {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

 
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />

        {/* User Avatar and Account Menu */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleMenuClick}
            sx={{ p: 0 }}
          >
            <Avatar alt={user.name} src="/static/images/avatar/1.jpg" />
          </IconButton>

          {/* User Account Menu */}
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleMenuClose}>
              <Avatar /> {user.name}
            </MenuItem>
            <Divider />

            <MenuItem onClick={handleMenuClose}>
              <Settings fontSize="small" />
              Settings
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <LogOut/>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default DashboardAppBar;
