import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const AUTH_URL = "http://localhost:5000/api/auth";
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();

  const getUser = async () => {
    const user = await axios.get(AUTH_URL);
    setUser(user.data);
    // setIsLoading(false);
  };
  return (
    <GlobalContext.Provider
      value={{
        getUser,
        user,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
