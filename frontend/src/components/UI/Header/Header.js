import { Link } from 'react-router-dom';
import * as routes from '../../../constants/routes';
import './Header.scss';

export default function Header() {
  return (
    <div className="headerContainer">
      <div className="appName">
        <h5>Hibler App</h5>
      </div>
      <div className="authButtons">
        <Link to={routes.REGISTER}>
          <span>Create account</span>
        </Link>
        <Link to={routes.LOGIN}>
          <span>Login</span>
        </Link>
      </div>
    </div>
  );
}
