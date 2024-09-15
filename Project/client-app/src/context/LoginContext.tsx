// src/context/LoginContext.tsx
import { createContext, useState, useEffect, ReactNode } from "react";

interface LoginContextType {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginContext = createContext<LoginContextType | null>(null);

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    // Check localStorage to see if user is logged in
    const storedLoginStatus = localStorage.getItem("loggedIn");
    return storedLoginStatus === "true"; // Parse it to boolean
  });

  useEffect(() => {
    // Whenever loggedIn state changes, update localStorage
    localStorage.setItem("loggedIn", String(loggedIn));
  }, [loggedIn]);

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};
