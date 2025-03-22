import axios, { AxiosError } from "axios";
import { API_URL } from "../../constants/index";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loginUser(email: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/api/user/login`, {
      email: email, 
      password,
    });
    if (response.data.token) {
      await AsyncStorage.setItem('authToken', response.data.token);
      console.log("Login successful, token saved.", response.data.token);
      await AsyncStorage.setItem('requesterId', response.data.requesterId);
      console.log("req id.", response.data.requesterId);

      
      // Kaydedilen token'ı hemen kontrol etmek
      const tokenCheck = await AsyncStorage.getItem('authToken');
      console.log("Token kaydedildikten sonra:", tokenCheck);
      
      return response.data; 
    } else {
      console.error("Login failed, no token received.");
      throw new Error("Login failed, no token received.");
    }
  } catch (err: AxiosError | any) {
    // Hata durumunda
    if (axios.isAxiosError(err)) {
      console.error("Axios error: ", err.response?.data);
    } else {
      console.error("Error: ", err.message);
    }
    throw err; 
  }
}

