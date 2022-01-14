import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateAuth = ({ children }) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateAuth;
