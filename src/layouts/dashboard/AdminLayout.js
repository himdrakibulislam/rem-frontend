import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { DASHBOARD_NAVIGATION } from "../../data/dashboardnav";
import logo from "../../assets/logo.png";
import { Box, LinearProgress } from "@mui/material";
import { AuthProvider } from "../../context/AuthContext";
import ProtectedRoute from "../../components/ProtectedRoutes";
import { ToastContainer } from "react-toastify";

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  // colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});
function AdminLayout(props) {
  const { window } = props;

  return (
    <AuthProvider>
      <AppProvider
      
        branding={{
          logo: <img src={logo} alt="MUI logo" />,
          title: "",
        }}
        navigation={DASHBOARD_NAVIGATION}
        theme={demoTheme}
        window={window}
      >
        <DashboardLayout>
          <Suspense fallback={<LinearProgress />}>
            <Box sx={{ mx: 1, my: 1 }}>
              <ProtectedRoute
                path="/dashboard"
                element={<Outlet />}
                requiredRole="admin"
              />
            </Box>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              closeOnClick
              draggable
              pauseOnHover
            />
          </Suspense>
        </DashboardLayout>
      </AppProvider>
    </AuthProvider>
  );
}

export default AdminLayout;
