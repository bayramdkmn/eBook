import api from "../../../../api/axios";

export async function sendProblem(
  email: string,
  problem: string,
  type: string
) {
  try {
    const response = await api.post("/api/user/sendReport", {
      email,
      problem,
      type,
    });

    if (response.data) {
      return response.data;
    } else {
      console.error("Problem could not be sent!");
      throw new Error("Problem could not be sent!");
    }
  } catch (err: any) {
    console.error("sendProblem error:", err.response?.data || err.message);
    throw err;
  }
}
