import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { UserAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
}

export default PrivateRoute