import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as routes from '../../constants/routes';

export default function ProtectedRoute() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();

  return !isLoggedIn ? (
    <Navigate to={routes.LOGIN} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}
