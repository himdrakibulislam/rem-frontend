// src/routes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/404";
import AuthLayout from "./layouts/auth/AuthLayout";
import AdminLayout from "./layouts/dashboard/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import ForgotPassword from "./pages/forgot-password";
import UsersPermission from "./pages/users-permission";

const AppRoutes = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/sign-up" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Route>
    <Route element={<AdminLayout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/properties" element={<p>Properties</p>} />
      <Route path="/users-permission" element={<UsersPermission/>} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
