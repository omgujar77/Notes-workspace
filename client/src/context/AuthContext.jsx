import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // NAVIGATE
  const navigate = useNavigate();

  // USER STATE
  const [user, setUser] = useState(null);

  // LOADING STATE
  const [loading, setLoading] = useState(true);

  // CHECK AUTH ON REFRESH
  useEffect(() => {

    const token = localStorage.getItem("token");

    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {

      setUser(JSON.parse(storedUser));
    }

    setLoading(false);

  }, []);

  // LOGIN
  const login = (userData, token) => {

    localStorage.setItem("token", token);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// CUSTOM HOOK
export const useAuth = () => {
  return useContext(AuthContext);
};