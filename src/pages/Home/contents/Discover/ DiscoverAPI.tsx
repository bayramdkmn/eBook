import axios, { AxiosError } from "axios";
import { API_URL } from "../../../../constants";

export async function fetchPosts() {
  try {
    const response = await axios.get(`${API_URL}/api/posts`);
    return response.data;
  } catch (err: AxiosError | any) {
    if (axios.isAxiosError(err)) {
      console.error("Axios error while fetching posts: ", err.response?.data);
    } else {
      console.error("Error while fetching posts: ", err.message);
    }
    throw err;
  }
}

export async function addNewPost(userId: number, content: string) {
  try {
    const response = await axios.post(`${API_URL}/api/posts`, {
      userId,
      content,
    });
    console.log(response.data);
    return response.data;
  } catch (err: AxiosError | any) {
    console.log("Axios error:", err.response?.data);
  }
}
