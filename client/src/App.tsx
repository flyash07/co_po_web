import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import LoginPage from "./components/login/LoginPage";
import LandingPage from "./LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Targets from "./components/dashboard/Targets";
import CoRootCause from "./components/dashboard/CoRootCause";
import PoRootCause from "./components/dashboard/PoRootCause";
import PoActionPlan from "./components/dashboard/PoActionPlan";
import CoActionPlan from "./components/dashboard/CoActionPlan";
import CoAttainment from "./components/dashboard/CoAttainment";
import CoPoMapping from "./components/dashboard/CoPoMapping";
import AdminPage from "./components/admin/AdminPage"; 

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
                <Dashboard />
            }
          />
          <Route
            path="/dashboard/targets"
            element={
              <ProtectedRoute
                requiredRole={["Professor", "Coordinator", "HOD"]}
              >
                <Targets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/CoRootCause"
            element={
              <ProtectedRoute
                requiredRole={["Professor", "Coordinator", "HOD"]}
              >
                <CoRootCause />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/PoRootCause"
            element={
              <ProtectedRoute
                requiredRole={["Professor", "Coordinator", "HOD"]}
              >
                <PoRootCause />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/PoActionPlan"
            element={
              <ProtectedRoute
                requiredRole={["Professor", "Coordinator", "HOD"]}
              >
                <PoActionPlan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/CoActionPlan"
            element={
              <ProtectedRoute
                requiredRole={["Professor", "Coordinator", "HOD"]}
              >
                <CoActionPlan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/CoAttainment"
            element={
              <ProtectedRoute
                requiredRole={["Professor", "Coordinator", "HOD"]}
              >
                <CoAttainment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/CoPoMapping"
            element={
              <ProtectedRoute
                requiredRole={["Professor", "Coordinator", "HOD"]}
              >
                <CoPoMapping />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/CourseFeedback"
            element={
              <ProtectedRoute
                requiredRole={["Professor", "Coordinator", "HOD"]}
              >
                <CoPoMapping />
              </ProtectedRoute>
            }
          />

          {/*Admin Page Route */}
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
