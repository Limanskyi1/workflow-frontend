import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { getIsAuthenticated } from "@/modules/auth/model/selectors";

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
