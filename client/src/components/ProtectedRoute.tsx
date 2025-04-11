import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

interface ProtectedRouteProps {
  requiredRole?: string[]; // optional
  requireHOD?: boolean;    // optional
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRole = [],
  requireHOD = false,
  children,
}) => {
  const { user, hod } = useUser();

  if (user === "") {
    return <div>Loading...</div>;
  }

  // HOD-only routes
  if (requireHOD && !hod) {
    return <Navigate to="/login" />;
  }

  // Role-based access
  if (requiredRole.length > 0 && !requiredRole.includes(user)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
