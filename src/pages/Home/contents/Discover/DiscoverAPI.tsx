import api from "../../../../api/axios";

export async function fetchUserPosts() {
  try {
    const response = await api.get("/api/userPosts/getUserPosts");
    return response.data;
  } catch (err: any) {
    console.error("Postları çekerken hata:", err.response?.data || err.message);
    throw err;
  }
}

export async function deleteUserPost(postId: string) {
  try {
    const response = await api.delete(
      `/api/userPosts/deleteUserPost/${postId}`
    );
    return response.data;
  } catch (err: any) {
    console.error("Post silerken hata:", err.response?.data || err.message);
    throw err;
  }
}
