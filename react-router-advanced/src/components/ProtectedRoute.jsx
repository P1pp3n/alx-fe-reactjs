import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Import useAuth hook

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Get authentication status from the hook

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
