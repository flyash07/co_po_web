import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface AppLayoutProps {
  children: ReactNode;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, isLoggedIn, onLogout }) => {
  return (
    <div>
      <Header/>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;
