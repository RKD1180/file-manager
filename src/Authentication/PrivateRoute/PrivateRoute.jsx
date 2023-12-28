import { Navigate } from 'react-router-dom';
export const PrivateRoute = ({ children }) => {
    const getData = localStorage.getItem("token");
    const token = JSON.parse(getData);
    if (!token?.token) {
      return <Navigate to="/sign-in" />;
    }
    return children;
};