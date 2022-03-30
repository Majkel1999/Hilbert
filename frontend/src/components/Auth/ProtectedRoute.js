import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as routes from '../../constants/routes';

export default function RequireAuth() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return isLoggedIn ? <Navigate to={routes.HOME} /> : <Outlet />;
}
