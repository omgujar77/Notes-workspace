import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({
  children,
}) => {

  const {
    user,
    loading,
  } = useAuth();

  // PREVENT FLICKER
  if (loading) {
    return null;
  }

  // NO USER
  if (!user) {
    return (
      <Navigate to="/login" replace />
    );
  }

  // ALLOW ACCESS
  return children;
};

export default ProtectedRoute;