import axios, { AxiosError } from "axios";
import { API_URL } from "../../constants/index";

export async function loginUser(email: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/api/user/login`, {
      email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      console.log("Login successful, token saved.", response.data.token);

      localStorage.setItem('requesterId', response.data.requesterId);
      console.log("Requester ID saved:", response.data.requesterId);

      const tokenCheck = localStorage.getItem('authToken');
      console.log("Token kaydedildikten sonra:", tokenCheck);

      return response.data;
    } else {
      console.error("Login failed, no token received.");
      throw new Error("Login failed, no token received.");
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
