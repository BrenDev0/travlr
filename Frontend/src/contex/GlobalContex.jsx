import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  
  const AUTH_URL = "http://localhost:5000/api/auth";
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(false)
  const [error, setError] = useState(null)

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const user = await axios.get(AUTH_URL);

    setUser(user.data.status);
    user.data.token ? setToken(user.data.token) : null
  };
  return (
    <GlobalContext.Provider
      value={{
        getUser,
        setUser,
        user,
        isLoading,
        setIsLoading,
        error,
        setError
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
