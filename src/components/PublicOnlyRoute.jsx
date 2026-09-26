import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PublicOnlyRoute = ({ children }) => {
  const { token } = useAuth();
  if (token) return <Navigate to="/" />;
  return children;
};
