import axios, { AxiosError } from "axios";
import { API_URL } from "../../../../constants/index";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getSwapList(){
    try {
        const response = await axios.get(`${API_URL}/api/swapRequest`)
        return response.data;
        
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