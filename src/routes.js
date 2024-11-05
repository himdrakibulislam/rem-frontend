// src/routes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/404";
import AuthLayout from "./layouts/auth/AuthLayout";
import AdminLayout from "./layouts/dashboard/AdminLayout";
import Dashboard from "./pages/Dashboard";

const AppRoutes = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="/" element={<Home />} />
    </Route>
    <Route element={<AdminLayout />}>
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
