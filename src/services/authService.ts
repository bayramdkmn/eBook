import api from "../api/axios";

export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/api/user/login", { email, password });
  return response.data; 
};

export const createUser = async (data: any) => {
    const response = await api.post("/api/user", data);
    return response.data;
};