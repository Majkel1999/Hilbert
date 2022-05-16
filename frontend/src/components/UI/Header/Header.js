import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { authActions } from '../../../store/auth/auth-slice';
import * as routes from '../../../constants/routes';
import './Header.scss';

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(authActions.logout());
    navigate(routes.LOGIN, { replace: true });
  };

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
          <div className="userIcon">
            <FontAwesomeIcon icon="fa-solid fa-circle-user" size="4x" />
            <ul>
              <li>
                <Link to={routes.LOGIN} onClick={logout}>
                  <span>Your account</span>
                </Link>
              </li>
              <li>
                <Link to={routes.LOGIN} onClick={logout}>
                  <span>Sign out</span>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
