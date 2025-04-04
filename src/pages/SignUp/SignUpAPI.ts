import api from "../../api/axios";

export async function createUser(data: any) {
  try {
    console.log("Kayıt verisi:", data);

    const response = await api.post("/api/user", data);

    console.log("Kayıt başarılı:", response.data);
    return response.data;
  } catch (err: any) {
    console.error("createUser error:", err.response?.data || err.message);
    throw err;
  }
}
