import React from "react";

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div>
      <h1>You're here at login</h1>
    </div>
  );
};

export default LoginPage;
