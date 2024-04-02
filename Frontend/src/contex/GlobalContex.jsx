import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import axios from "axios";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
