// ProtectedRoute.jsx
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get('token');

  if (!token) {
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default ProtectedRoute;
