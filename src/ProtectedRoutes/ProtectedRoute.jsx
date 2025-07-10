// ProtectedRoute.js
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const decodeUser = decodeToken(user);
  let currentTime = Date.now();
  let isValidToken = decodeUser?.exp * 1000 > currentTime;
  if (isValidToken) {
    console.log("token is valid ");
  }

  if (!user) return <Navigate to="/user-login" replace />;
  return children;
};

export default ProtectedRoute;
