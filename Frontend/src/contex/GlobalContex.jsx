import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [loggedin, setLoggedin] = useState(undefined);

  const access = async () => {
    const auth = await axios.get("http://localhost:5000/api/auth");
    setLoggedin(auth.data);
  };

  useEffect(() => {
    access();
  }, []);

  return (
    <GlobalContext.Provider value={{ loggedin, access }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
