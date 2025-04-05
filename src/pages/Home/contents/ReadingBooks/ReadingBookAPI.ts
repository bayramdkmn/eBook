import api from "../../../../api/axios";

export async function addReadingBooks(data: any) {
  try {
    const requesterId = localStorage.getItem("requesterId");

    if (!requesterId) {
      throw new Error("Requester ID bulunamadı");
    }

    const readingBookData = {
      ...data,
      requesterId,
    };

    const response = await api.post("/api/readingBooks/addReadingBook", readingBookData);

    return response.data;
  } catch (err) {
    console.error("frontend addReadingBooks hata", err);
  }
}
