import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import './Home.scss';

export default function Home() {
  return (
    <div className="homeContainer">
      <div className="mainContent">
        <h2 className="title">HILBERT - Text tagging with AI</h2>
        <div className="buttons">
          <Link to={routes.REGISTER}>Create account</Link>
          <Link to={routes.LOGIN}>Login</Link>
          <Link to={routes.HOME}>About us</Link>
        </div>
      </div>
    </div>
  );
}
