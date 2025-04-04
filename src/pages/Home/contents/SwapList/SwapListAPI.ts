import api from "../../../../api/axios";

export async function getSwapList() {
  try {
    const response = await api.get("/api/swapRequest");
    return response.data;
  } catch (err: any) {
    console.error("getSwapList error:", err.response?.data || err.message);
    throw err;
  }
}

export async function createSwap(data: any) {
  try {
    const requesterId = localStorage.getItem("requesterId");

    if (!requesterId) {
      throw new Error("Requester ID bulunamadı");
    }

    const swapData = {
      ...data,
      requesterId,
    };

    console.log("İstek verisi:", swapData);

    const response = await api.post("/api/swapRequest/createSwap", swapData);
    return response.data;
  } catch (err: any) {
    console.error("createSwap error:", err.response?.data || err.message);
    throw err;
  }
}
