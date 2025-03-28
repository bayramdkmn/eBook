import axios, { AxiosError } from "axios";
import { API_URL } from "../../constants/index";

export async function sendMail(email: string) {
    try {
      const response = await axios.post(`${API_URL}/api/user/sendMail`, {
        email,
      });
  
      if (response.data) {
        return response.data;
      } else {
        console.error("Email could not be sent!");
        throw new Error("Email could not be sent!");
      }
    } catch (err: AxiosError | any) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error: ", err.response?.data);
      } else {
        console.error("Error: ", err.message);
      }
      throw err;
    }
  }

export async function checkCode(email: string, code: string) {
    try {
        const response = await axios.post(`${API_URL}/api/user/checkCode`, {
          email,
          code
        });
    
        if (response.data) {
          return response.data;
        } else {
          console.error("There is problem!");
          throw new Error("There is problem!");
        }
      } catch (err: AxiosError | any) {
        if (axios.isAxiosError(err)) {
          console.error("Axios error: ", err.response?.data);
        } else {
          console.error("Error: ", err.message);
        }
        throw err;
      }
}

export async function resetPassword(password: string) {
    try {
        const response = await axios.post(`${API_URL}/api/user/resetPassword`, {
          password,
        });
    
        if (response.data) {
          return response.data;
        } else {
          console.error("There is problem!");
          throw new Error("There is problem!");
        }
      } catch (err: AxiosError | any) {
        if (axios.isAxiosError(err)) {
          console.error("Axios error: ", err.response?.data);
        } else {
          console.error("Error: ", err.message);
        }
        throw err;
      }
}