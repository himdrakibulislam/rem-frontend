import React, { Fragment, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { ToastContainer } from "react-toastify";

function AuthLayout() {
  return (
    <Fragment>
      <main>
        <Suspense fallback={<LinearProgress />}>
          <Outlet />
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick draggable pauseOnHover />
        </Suspense>
      </main>
    </Fragment>
  );
}

export default AuthLayout;
