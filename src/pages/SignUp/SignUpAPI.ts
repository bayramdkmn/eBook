import api from "../../api/axios";

export async function createUser(data: any) {
  try {
    const response = await api.post("/api/user", data);
    return response.data;
  } catch (err: any) {
    console.error("createUser error:", err.response?.data || err.message);
    throw err;
  }
}
