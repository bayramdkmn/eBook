import api from "../../../../api/axios";

export async function addUserPost(title: string, content: string) {
  const response = await api.post("/api/userPosts/newPost", {
    title,
    content,
  });

  return response.data;
}
