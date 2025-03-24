import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/Auth';
import Spinner from '../layout/Spinner';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  
  if (loading) return <Spinner />;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default PrivateRoute;