import { useLocation } from 'react-router-dom';
import Login from '../../components/Auth/Login';
import Register from '../../components/Auth/Register';

import './Auth.scss';

const AuthComponents = [
  {
    component: <Login />,
    path: '/login',
  },
  {
    component: <Register />,
    path: '/register',
  },
];

export default function Auth() {
  const location = useLocation();
  return AuthComponents.find(
    (authObject) => authObject.path === location.pathname,
  ).component;
}
