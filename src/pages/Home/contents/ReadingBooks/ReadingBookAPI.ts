import api from "../../../../api/axios";

export async function addReadingBooks(data: {
  bookTitle: string;
  author: string;
  genre: string;
  image: string;
}) {
  try {
    const response = await api.post("/api/readingBooks/addReadingBook", data);
    return response.data; // { message, book, readingList }
  } catch (err) {
    console.error("frontend addReadingBooks hata", err);
    throw err;
  }
}

export async function getReadingBooks() {
  try {
    const response = await api.get("/api/readingBooks");
    return response.data; 
  } catch (err) {
    console.error("getReadingBooks frontend hata", err);
    throw err;
  }
}

export async function deleteReadingBook(bookId: string) {
  try {
    await api.delete(`/api/readingBooks/deleteReadingBook/${bookId}`);
  } catch (err) {
    console.error("frontend deleteReadingBook hata", err);
    throw err;
  }
}


