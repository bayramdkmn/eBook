export type AuthContextType = {
    userToken: string | null;
    setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
    setToken: any;
  };

