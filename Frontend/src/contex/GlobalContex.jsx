import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const AUTH_URL = "http://localhost:5000/api/auth";
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({ status: false });

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const user = await axios.get(AUTH_URL);
    user.status ? setUser(user.data) : null;
  };
  return (
    <GlobalContext.Provider
      value={{
        getUser,
        setUser,
        user,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
