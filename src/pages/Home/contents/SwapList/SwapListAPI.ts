import axios, { AxiosError } from "axios";
import { API_URL } from "../../../../constants/index";

export async function getSwapList() {
  try {
    const token = localStorage.getItem('authToken');
    console.log("token", token);

    if (!token) {
      throw new Error('Token bulunamadı');
    }

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
    const token = localStorage.getItem('authToken');
    const requesterId = localStorage.getItem('requesterId');

    if (!token) {
      throw new Error('Token bulunamadı');
    }

    if (!requesterId) {
      throw new Error('Requester ID bulunamadı');
    }

    console.log("token", token);
    console.log("request id", requesterId);

    const swapData = {
      ...data,
      requesterId,
    };

    console.log(swapData);

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
