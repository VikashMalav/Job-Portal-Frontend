import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Settings from "./Settings";

const AdminRoutes = () => (
  <Routes>
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="users" element={<Users />} />
    <Route path="settings" element={<Settings />} />
    <Route path="*" element={<Navigate to="dashboard" />} />
  </Routes>
);

export default AdminRoutes;
