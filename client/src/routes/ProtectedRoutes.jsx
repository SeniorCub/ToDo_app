import { jwtDecode } from 'jwt-decode';
import { logout } from '../hooks/logout';

const ProtectedRoute = ({ children }) => {
     const token = localStorage.getItem('token');

     if (!token) {
          logout();
     }

     try {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decoded?.exp < currentTime) {
               logout();
          }
     } catch (error) {
          console.error('Invalid token', error)
          logout();
     }

     return children;
};

export default ProtectedRoute;
