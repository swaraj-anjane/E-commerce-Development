import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const AdminProtectedRoute = ({ children }) => {
  const { userDetails, isLoading } = useSelector(state => state.user);

  if (isLoading) return null;

  if (userDetails?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
