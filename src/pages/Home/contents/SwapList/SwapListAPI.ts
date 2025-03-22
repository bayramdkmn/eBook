import axios, { AxiosError } from "axios";
import { API_URL } from "../../../../constants/index";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getSwapList() {
  try {
      // AsyncStorage'dan token'ı alıyoruz
      const token = await AsyncStorage.getItem('authToken');
      console.log("token",token)
      // Eğer token yoksa hata döndürüyoruz
      if (!token) {
          throw new Error('Token bulunamadı');
      }

      // Token'ı Authorization başlığına ekliyoruz
      const response = await axios.get(`${API_URL}/api/swapRequest`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      return response.data;
  } catch (err: AxiosError | any) {
      if (axios.isAxiosError(err)) {
          console.error("Axios error: ", err.response?.data);
      } else {
          console.error("Error: ", err.message);
      }
      throw err;
  }
}

export async function createSwap(data: any) {
  try {
    const token = await AsyncStorage.getItem('authToken'); // Auth token
    const requesterId = await AsyncStorage.getItem('requesterId'); // requesterId
    // Eğer token veya requesterId yoksa hata döndürüyoruz
    if (!token) {
      throw new Error('Token bulunamadı');
    }
    if (!requesterId) {
      throw new Error('Requester ID bulunamadı');
    }
    console.log("token",token)
    console.log("request id",requesterId)

    // Veriyi hazırlıyoruz
    const swapData = {
      ...data,
      requesterId,
    };
    console.log(swapData)

    // Token'ı Authorization başlığına ekliyoruz
    const response = await axios.post(`${API_URL}/api/swapRequest/createSwap`, swapData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (err) {
    console.error("Error: ", err);
  }
}
