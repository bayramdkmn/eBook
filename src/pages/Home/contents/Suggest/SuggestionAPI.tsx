import axios, { AxiosError } from "axios";
import { API_URL } from "../../../../constants/index";

export async function sendSuggestion(email: string, problem: string, type: string) {
    try {
      const response = await axios.post(`${API_URL}/api/user/sendReport`, {
        email,
        problem,
        type
      });
  
      if (response.data) {
        return response.data;
      } else {
        console.error("Problem could not be sent!");
        throw new Error("Problem could not be sent!");
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