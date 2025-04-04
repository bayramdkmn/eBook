import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { fetchUserPosts } from "../pages/Home/contents/Discover/DiscoverAPI";
interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  images?: string[];
  user: {
    name: string;
    surname: string;
    avatar?: string;
  };
}

type UserContextType = {
  isUserLogin: boolean;
  setIsUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
  posts: Post[];
  fetchPosts: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const data = await fetchUserPosts();
      setPosts(data);
    } catch (err) {
      console.error("Gönderiler alınamadı", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsUserLogin(true);
      fetchPosts();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        isUserLogin,
        setIsUserLogin,
        posts,
        fetchPosts,
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
