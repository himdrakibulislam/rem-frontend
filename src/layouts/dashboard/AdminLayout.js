import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import ProtectedRoute from "../../components/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import AdminSideBar from "../../components/Sidebar/Sidebar";

function AdminLayout(props) {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading.....</p>}>
        <ProtectedRoute
          path="/dashboard"
          element={
            <AdminSideBar>
              <Outlet />
            </AdminSideBar>
          }
          requiredRole="admin"
        />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          draggable
          pauseOnHover
        />
      </Suspense>
    </AuthProvider>
  );
}

export default AdminLayout;
