import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import LoginPage from "./components/login/LoginPage";
import LandingPage from "./LandingPage"
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <AppLayout isLoggedIn={isLoggedIn} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element = {<LandingPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin}/>} />

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
