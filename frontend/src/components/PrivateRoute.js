import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token"); // check JWT token

  if (!token) {
    return <Navigate to="/" replace />; // redirect to login if no token
  }

  return children;
}