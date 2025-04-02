import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type UserContextType = {
  isUserLogin: boolean;
  setIsUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsUserLogin(true);
    }
  }, []);

  return (
    <UserContext.Provider value={{ isUserLogin, setIsUserLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserContext Error");
  }
  return context;
};
