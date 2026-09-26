import { createContext, useContext, useState } from "react";
import { auth } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [errorLog, setErrorLog] = useState();

  const login = async (email, password) => {
    try {
      const res = await auth(email, password);
      setToken(res.token || null);
      localStorage.setItem("token", res.token || "");
      setErrorLog("");
      return true
    } catch (error) {
      setErrorLog(error.message);
      return false
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setErrorLog("");
  };

  return (
    <AuthContext.Provider value={{ token, errorLog, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
