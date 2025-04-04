import api from "../../api/axios";

export async function loginUser(email: string, password: string) {
  try {
    const response = await api.post("/api/user/login", {
      email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      console.log("Login successful, token saved.", response.data.token);

      localStorage.setItem('requesterId', response.data.requesterId);
      console.log("Requester ID saved:", response.data.requesterId);

      const base64Payload = response.data.token.split('.')[1];
      const decodedPayload = JSON.parse(atob(base64Payload));
      const expiration = decodedPayload.exp;

      localStorage.setItem('authTokenExp', expiration.toString());
      console.log("Token expires at (timestamp):", expiration);

      return response.data;
    } else {
      console.error("Login failed, no token received.");
      throw new Error("Login failed, no token received.");
    }
  } catch (err: any) {
    console.error("Login error:", err.response?.data || err.message);
    throw err;
  }
}
