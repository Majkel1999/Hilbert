import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../../components/Auth/Login';
import Register from '../../components/Auth/Register';
import { authActions } from '../../store/Slices/auth';
import * as routes from '../../constants/routes';
import './Auth.scss';

const AuthComponents = [
  {
    component: <Login />,
    path: routes.LOGIN,
  },
  {
    component: <Register />,
    path: routes.REGISTER,
  },
];

export default function Auth() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) dispatch(authActions.logout());
  });

  return (
    <div className="authContainer">
      {
        AuthComponents.find(
          (authObject) => authObject.path === location.pathname,
        ).component
      }
      ;
    </div>
  );
}
