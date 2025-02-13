// This file defines a UserContext for managing the logged-in user's role (e.g., Prof, HOD, Subject Coordinator).
// It provides a UserProvider to wrap the application and a useUser hook for accessing and updating the user role.

import React, { createContext, useState, useContext, ReactNode } from "react";

interface UserContextType {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string>("");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
