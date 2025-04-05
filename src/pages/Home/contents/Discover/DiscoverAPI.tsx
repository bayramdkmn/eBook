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

export async function getUserSuggestions() {
  try {
    const response = await api.get("api/follow/suggestions");
    return response.data;
  } catch (err: any) {
    console.error("Kullanıcı önerileri alırken hata:", err);
  }
}

export async function getFollowedPosts() {
  try {
    const response = await api.get("/api/follow");
    return response.data;
  } catch (err: any) {
    console.error(
      "Takip edilen kullanıcıların gönderilerini alırken hata:",
      err
    );
  }
}

export async function deleteUserPost(postId: string) {
  try {
    const response = await api.delete(
      `/api/userPosts/deleteUserPost/${postId}`
    );
    return response.data;
  } catch (err: any) {
    console.error("Post silerken hata:", err);
  }
}

export async function followUserApi(followingId: string) {
  try {
    const response = await api.post("api/follow", { followingId });
    return response.data;
  } catch (err: any) {
    console.error("Follow user error:", err);
  }
}
