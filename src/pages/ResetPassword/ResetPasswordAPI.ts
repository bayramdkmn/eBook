import api from "../../api/axios";

export async function sendMail(email: string) {
  try {
    const response = await api.post("/api/user/sendMail", { email });

    if (response.data) {
      return response.data;
    } else {
      console.error("Email could not be sent!");
      throw new Error("Email could not be sent!");
    }
  } catch (err: any) {
    console.error("sendMail error:", err.response?.data || err.message);
    throw err;
  }
}

export async function checkCode(email: string, code: string) {
  try {
    const response = await api.post("/api/user/checkCode", { email, code });

    if (response.data) {
      return response.data;
    } else {
      console.error("There is a problem!");
      throw new Error("There is a problem!");
    }
  } catch (err: any) {
    console.error("checkCode error:", err.response?.data || err.message);
    throw err;
  }
}

export const resetPassword = async (data: { email: string; newPassword: string }) => {
  try {
    const response = await api.post("/api/user/resetPassword", data);

    if (response.data) {
      return response.data;
    } else {
      console.error("There is a problem!");
      throw new Error("There is a problem!");
    }
  } catch (err: any) {
    console.error("resetPassword error:", err.response?.data || err.message);
    throw err;
  }
};
