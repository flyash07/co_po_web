import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

interface ProtectedRouteProps {
  requiredRole: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole, children }) => {
  const { user } = useUser();

  if (user === "") {
    // Optional: Show loading indicator while restoring user
    return <div>Loading...</div>;
  }

  return requiredRole.includes(user) ? children : <Navigate to="/login" />;

};


export default ProtectedRoute;
