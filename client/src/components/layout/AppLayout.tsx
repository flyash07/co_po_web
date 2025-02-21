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
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", maxWidth: "100vw"}}>
      <Header isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <main style={{ flexGrow: 1 }}>{children}</main>
      <Footer/>
    </div>
  );
};

export default AppLayout;
