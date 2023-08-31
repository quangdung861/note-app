import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  if (!localStorage.getItem("accessToken")) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
