import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const getData = localStorage.getItem("user");
    const userData = JSON.parse(getData);
    setUser(userData);
  }, []);

  const login = useCallback(() => {
    const getData = localStorage.getItem("user");
    const user = JSON.parse(getData);
    setUser(user);
    navigate("/");
  }, [navigate]);

  
  const logout = useCallback(() => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  }, [navigate]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [login, logout, user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
