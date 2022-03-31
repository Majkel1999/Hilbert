import { useLocation, Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import * as routes from '../../constants/routes';

export default function ProtectedRoute({ requireLogin }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();

  return (requireLogin ? isLoggedIn : !isLoggedIn) ? (
    <Outlet />
  ) : (
    <Navigate
      to={requireLogin ? routes.LOGIN : routes.HOME}
      state={{ from: location }}
      replace
    />
  );
}
ProtectedRoute.propTypes = {
  requireLogin: PropTypes.bool,
};

ProtectedRoute.defaultProps = {
  requireLogin: false,
};
