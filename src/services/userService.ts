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
  
  