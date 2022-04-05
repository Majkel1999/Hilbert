import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../../store/auth/auth-slice';

import * as routes from '../../../constants/routes';
import './Header.scss';

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const logout = () => dispatch(authActions.logout());

  return (
    <div className="headerContainer">
      <div className="appName">
        <Link to={routes.HOME}>
          <span>Hilbert App</span>
        </Link>
      </div>
      <div className="authButtons">
        {!isLoggedIn ? (
          <div>
            <Link to={routes.REGISTER}>
              <span>Create account</span>
            </Link>
            <Link to={routes.LOGIN}>
              <span>Login</span>
            </Link>
          </div>
        ) : (
          <div>
            <Link to={routes.LOGIN} onClick={logout}>
              <span>Sign out</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
