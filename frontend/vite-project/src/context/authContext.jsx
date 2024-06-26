import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const AuthContext = createContext();
import Cookies from "js-cookie";

import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [dbToken, setDbToken] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const accessToken = Cookies.get("access_cookie");
    console.log("access  " + accessToken);
    console.log("fron  " + dbToken);
    // if (accessToken || dbToken) {
    //   if (accessToken == dbToken) {
    //     navigate("/");
    //   } else {
    //     navigate("/login");
    //   }
    // }
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticate, setIsAuthenticate, setDbToken, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
