import axios, { AxiosError } from "axios";
import { API_URL } from "../../../../constants/index";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function addReadingBooks(data:any) {
    try {
        const token = await AsyncStorage.getItem('authToken');
        const requesterId = await AsyncStorage.getItem('requesterId')
        if (!token) {
            throw new Error('Token bulunamadı');
          }
          if (!requesterId) {
            throw new Error('Requester ID bulunamadı');
          }
        const readingBookData = {
            ...data,
            requesterId
        }
        console.log("backend gidecek data",readingBookData)
        const response = await axios.post(`${API_URL}/api/readingBooks/addReadingBook`,readingBookData,{
            headers:{
                "Content-Type":"application/json",Authorization:`Bearer ${token}`
            }
        })
        return response.data;
    } catch (err) {
        console.log("frontend addreadingbooks hata",err)
    }
}