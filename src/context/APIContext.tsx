import React, { createContext, useContext, ReactNode } from "react";
import { UserProfile } from "../types/User.type";
import api from "../api/axios";

interface APIContextType {
  getUserById: (id: string) => Promise<UserProfile>;
  updateUserProfile: (
    id: string,
    data: Partial<UserProfile>
  ) => Promise<UserProfile>;
  updatePassword: (
    id: string,
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
}

const APIContext = createContext<APIContextType | undefined>(undefined);

export const AppAPIProvider = ({ children }: { children: ReactNode }) => {
  const getUserById = async (id: string) => {
    const response = await api.get(`/api/user/getUserById/${id}`);
    return response.data;
  };

  const updateUserProfile = async (id: string, data: Partial<UserProfile>) => {
    const response = await api.put(`/api/user/updateProfile/${id}`, data);
    return response.data;
  };

  const updatePassword = async (
    id: string,
    currentPassword: string,
    newPassword: string
  ) => {
    await api.put(`/api/user/updatePassword/${id}`, {
      currentPassword,
      newPassword,
    });
  };

  return (
    <APIContext.Provider
      value={{
        getUserById,
        updateUserProfile,
        updatePassword,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export const useAPI = () => {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error("useAPI must be used within an APIProvider");
  }
  return context;
};
