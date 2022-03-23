import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';

export default RequireAuth = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
