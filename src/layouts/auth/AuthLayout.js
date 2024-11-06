import React, { Fragment, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function AuthLayout() {
  return (
    <Fragment>
      <main>
        <Suspense fallback={<p>Loading.....</p>}>
          <Outlet />
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick draggable pauseOnHover />
        </Suspense>
      </main>
    </Fragment>
  );
}

export default AuthLayout;
