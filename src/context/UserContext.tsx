import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getFollowedPosts,
  getUserFollowers,
  getUserFollowing,
  followUserRequest,
  unfollowUserRequest,
  getUserSuggestions,
} from "../services/userService";
import { loginUser } from "../services/authService";
import { Post, User, UserWithFollowersCount } from "../types/User.type";

type UserContextType = {
  isUserLogin: boolean;
  setIsUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
  posts: Post[];
  userFollowers: User[];
  userFollowing: User[];
  removeUserFromSuggestions: (userId: string) => void;
  fetchPosts: () => void;
  followUser: (followingId: string) => Promise<boolean>;
  unfollowUser: (userId: string) => Promise<void>;
  fetchFollowers: () => void;
  fetchUserSuggestions: () => void;
  fetchUserFollowing: () => void;
  userSuggestions: UserWithFollowersCount[];
  logout: () => void;
  handleLogin: (email: string, password: string) => Promise<void>;
  removePost: (postId: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [userFollowers, setUserFollowers] = useState<User[]>([]);
  const [userFollowing, setUserFollowing] = useState<User[]>([]);
  const [userSuggestions, setUserSuggestions] = useState<
    UserWithFollowersCount[]
  >([]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const data = await loginUser(email, password);

      if (data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("requesterId", data.requesterId);

        const base64Payload = data.token.split(".")[1];
        const decodedPayload = JSON.parse(atob(base64Payload));
        const expiration = decodedPayload.exp;
        localStorage.setItem("authTokenExp", expiration.toString());

        setIsUserLogin(true);
        fetchPosts();
        fetchUserSuggestions();
        fetchFollowers();
        fetchUserFollowing();
      } else {
        throw new Error("Token alınamadı.");
      }
    } catch (err) {
      console.error("Giriş hatası:", err);
      throw err;
    }
  };

  const logout = () => {
    setIsUserLogin(false);
    setPosts([]);
    setUserSuggestions([]);
    setUserFollowers([]);
    setUserFollowing([]);
    localStorage.removeItem("authToken");
    localStorage.removeItem("requesterId");
    localStorage.removeItem("authTokenExp");
    localStorage.removeItem("userFollowers");
    localStorage.removeItem("userFollowing");
  };

  const fetchUserSuggestions = async () => {
    try {
      const data = await getUserSuggestions();
      setUserSuggestions(data);
    } catch (err) {
      console.error("Kullanıcı önerileri alınamadı", err);
    }
  };

  const removeUserFromSuggestions = (userId: string) => {
    setUserSuggestions((prev) => prev.filter((user) => user.id !== userId));
  };

  const removePost = (postId: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  const fetchPosts = async () => {
    try {
      const data = await getFollowedPosts();
      setPosts(data);
    } catch (err) {
      console.error("Gönderiler alınamadı", err);
    }
  };

  const fetchFollowers = async () => {
    try {
      const data = await getUserFollowers();
      setUserFollowers(data);
      localStorage.setItem("userFollowers", JSON.stringify(data));
    } catch (err) {
      console.error("Followers alınamadı", err);
    }
  };

  const fetchUserFollowing = async () => {
    try {
      const data = await getUserFollowing();
      setUserFollowing(data);
      localStorage.setItem("userFollowing", JSON.stringify(data));
    } catch (err) {
      console.error("Takip edilenler alınamadı", err);
    }
  };

  const followUser = async (followingId: string) => {
    try {
      await followUserRequest(followingId);
      await fetchFollowers();
      await fetchUserFollowing();
      await fetchPosts();
      return true;
    } catch (error) {
      console.error("Takip etme işlemi başarısız", error);
      throw error;
    }
  };

  const unfollowUser = async (userId: string) => {
    try {
      await unfollowUserRequest(userId);
      await fetchFollowers();
      await fetchUserFollowing();
      await fetchPosts();
    } catch (error) {
      console.error("Takibi bırakma işlemi başarısız", error);
      throw error;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsUserLogin(true);
      fetchPosts();
      fetchFollowers();
      fetchUserFollowing();
      fetchUserSuggestions();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        isUserLogin,
        setIsUserLogin,
        posts,
        userFollowers,
        userFollowing,
        removeUserFromSuggestions,
        fetchPosts,
        followUser,
        unfollowUser,
        fetchFollowers,
        fetchUserSuggestions,
        fetchUserFollowing,
        userSuggestions,
        logout,
        handleLogin,
        removePost,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("UserContext Error");
  return context;
};
