import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface UserContextType {
  user: string;
  setUser: (user: string) => void;
  logout: () => void;
  hod: boolean;
  setHod: (value: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<string>("");
  const [hod, setHodState] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedHod = localStorage.getItem("hod");

    if (storedUser) setUserState(storedUser);
    if (storedHod === "true") setHodState(true);
  }, []);

  const setUser = (user: string) => {
    setUserState(user);
    localStorage.setItem("user", user);
  };

  const setHod = (value: boolean) => {
    setHodState(value);
    localStorage.setItem("hod", value.toString());
  };

  const logout = () => {
    setUserState("");
    setHodState(false);
    localStorage.removeItem("user");
    localStorage.removeItem("hod");
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, hod, setHod }}>
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
