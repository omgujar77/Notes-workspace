import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {

  const token = localStorage.getItem("token");

  // If no token -> redirect login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token exists -> allow route
  return <Outlet />;
};

export default ProtectedRoute;