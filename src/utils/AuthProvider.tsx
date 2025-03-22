import React, { useState, useEffect, createContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContextType } from "../types/AuthContext.type";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  const loadToken = async () => {
    let token = await AsyncStorage.getItem("userToken");
    setUserToken(token);
  };

  const setToken = async (token: string) => {
    await AsyncStorage.setItem("userToken", token);
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
