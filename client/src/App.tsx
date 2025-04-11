import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import LoginPage from "./components/login/LoginPage";
import LandingPage from "./LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/dashboard/Dashboard";
import AdminPage from "./components/admin/AdminPage";
import DepartmentDetails from "./components/hod/DepartmentDetails";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <AppLayout isLoggedIn={isLoggedIn} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

          {/* Dashboard Routes */}
          {/* Had to remove protected route coz requiredrole is not being fulfullied at the time of login */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute
                requiredRole={["Professor", "Coordinator", "HOD"]}
              >
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/department-details"
            element={
              <ProtectedRoute requiredRole={["HOD"]}>
                <DepartmentDetails />
              </ProtectedRoute>
            }
          />

          {/*Admin Page Route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole={["admin"]}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
