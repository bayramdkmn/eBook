import api from "../api/axios";

export async function fetchUserPosts() {
    const response = await api.get("/api/userPosts/getUserPosts");
    return response.data;
}
  
export async function getUserSuggestions() {
    const response = await api.get("api/follow/suggestions");
    return response.data;
}
  
export async function getFollowedPosts() {
    const response = await api.get("/api/follow");
    return response.data;
}
  
export async function getUserFollowers() {
    const response = await api.get("/api/follow/followers");
    return response.data;
}
  
export async function getUserFollowing() {
      const response = await api.get("/api/follow/following");
      return response.data;
}
  
export async function deleteUserPost(postId: string) {
    const response = await api.delete(
        `/api/userPosts/deleteUserPost/${postId}`
      );
    return response.data;
}

export async function followUserRequest(followingId: string) {
    const response = await api.post(`/api/follow/${followingId}`);
    return response.data;
}
  
export async function unfollowUserRequest(userId: string) {
    const response = await api.delete(`/api/follow/${userId}`);
    return response.data;
}

export async function getWishBooks() {
    try {
      const response = await api.get("/api/wishBooks");
      return response.data;
    } catch (err) {
      console.error("getWishBooks frontend hata", err);
      throw err;
    }
}

export async function addWishBook(data: {
    bookTitle: string;
    author: string;
    image: string;
    genre: string;
  }) {
    try {
      const response = await api.post("/api/wishBooks/addWishBook", data);
      return response.data; 
    } catch (err) {
      console.error("frontend addWishBooks hata", err);
      throw err;
    }
}

export async function deleteWishBook(bookId: string) {
    try {
      await api.delete(`/api/wishBooks/${bookId}`);
    } catch (err) {
      console.error("frontend deleteWishBook hata", err);
      throw err;
    }
}

export async function addReadingBooksById(bookId: string) {
    try {
      const response = await api.post("/api/readingBooks/addReadingBookById", {bookId});
      return response.data; 
    } catch (err) {
      console.error("frontend addReadingBooksById hata", err);
      throw err;
    }
}

export async function addWishBookById(bookId: string) {
  try {
    const response = await api.post("/api/wishBooks/addWishBookById", {bookId});
    return response.data; 
  } catch (err) {
    console.error("frontend addWishBookById hata", err);
    throw err;
  }
}

export async function getAllBooks(){
  try {
    const response = await api.get("/api/books");
    return response.data;
  } catch (error) {
    console.error("getAllBooks hata", error);
    throw error;
    
  }
}

export async function getLibrariesWithBooks(){
  try {
    const response = await api.get("/api/library");
    return response.data;
  } catch (error) {
    console.error("getLibrariesWithBooks hata", error);
    throw error;
  }
}

export async function fetchAppointments(libraryBookId: string, date: string) {
  try {
    const response = await api.get(`/api/appointment`, {
      params: { libraryBookId, date }
    });
    return response.data;
  } catch (error) {
    console.error("fetchAppointments hata", error);
    throw error;
  }
}

export async function createAppointment(data: {
  userId: string;
  libraryBookId: string;
  startTime: string; 
  endTime: string;  
}) {
  try {
    const response = await api.post("/api/appointment", data);
    return response.data;
  } catch (error) {
    console.error("createAppointment hata:", error);
    throw error;
  }
}

  
  