import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  fetchUserPosts,
  getFollowedPosts,
  getUserSuggestions,
} from "../pages/Home/contents/Discover/DiscoverAPI";
interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  images?: string[];
  user: {
    id?: string;
    name: string;
    surname: string;
    avatar?: string;
  };
}

interface User {
  id: string;
  name: string;
  surname: string;
  avatar?: string;
}

type UserContextType = {
  isUserLogin: boolean;
  setIsUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
  posts: Post[];
  removeUserFromSuggestions: (userId: string) => void;
  fetchPosts: () => void;
  fetchUserSuggestions: () => void;
  userSuggestions: User[];
  logout: () => void;
  login: () => void;
  removePost: (postId: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [userSuggestions, setUserSuggestions] = useState<User[]>([]);

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

  const login = () => {
    setIsUserLogin(true);
    fetchPosts();
    fetchUserSuggestions();
  };
  const logout = () => {
    setIsUserLogin(false);
    setPosts([]);
    setUserSuggestions([]);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsUserLogin(true);
      fetchPosts();
      fetchUserSuggestions();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        isUserLogin,
        removePost,
        login,
        logout,
        removeUserFromSuggestions,
        setIsUserLogin,
        posts,
        fetchPosts,
        fetchUserSuggestions,
        userSuggestions,
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
