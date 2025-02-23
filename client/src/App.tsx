import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import LoginPage from "./components/login/LoginPage";
import LandingPage from "./LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Targets from "./components/dashboard/Targets";
import CoRootCause from "./components/dashboard/CoRootCause";
import PoRootCause from "./components/dashboard/PoRootCause"
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

          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute requiredRole="Professor">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/targets"
            element={
              <ProtectedRoute requiredRole="Professor">
                <Targets/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/CoRootCause"
            element={
              <ProtectedRoute requiredRole="Professor">
                <CoRootCause/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/PoRootCause"
            element={
              <ProtectedRoute requiredRole="Professor">
                <PoRootCause/>
              </ProtectedRoute>
            }
          />
          
          {/* <Route
            path="smtg"
            element={
              <ProtectedRoute>{ call another component here okay}</ProtectedRoute>
            }
          /> */}
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
