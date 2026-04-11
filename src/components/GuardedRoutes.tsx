import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function GuardedRoutes() {
  const { isProfiled } = useAuth();

  if (isProfiled === null) return null; // or loading UI
  if (!isProfiled) return <Navigate to="/details" replace />;

  return <Outlet />;
}

export default GuardedRoutes;