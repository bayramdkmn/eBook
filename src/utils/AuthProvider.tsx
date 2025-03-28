import React, { useState, useEffect, createContext, ReactNode } from "react";
import { AuthContextType } from "../types/AuthContext.type";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  const loadToken = () => {
    const token = localStorage.getItem("userToken");
    setUserToken(token);
  };

  const setToken = (token: string) => {
    localStorage.setItem("userToken", token);
    setUserToken(token); // State'i güncellemek önemli
  };

  useEffect(() => {
    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, setUserToken, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
