import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { login } from '../../store/auth/auth-actions';
import GenericForm from '../GenericForm/GenericForm';
import * as routes from '../../constants/routes';

export default function Login() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const inputArray = [
    {
      label: 'username',
      inputType: 'text',
      setValue: setUsername,
      inputValue: username,
    },
    {
      label: 'password',
      inputType: 'password',
      setValue: setPassword,
      inputValue: password,
    },
  ];

  const previousPage = location?.state?.from?.pathname || routes.HOME;

  const loginHandler = (e) => {
    e.preventDefault();
    const loginFormData = new FormData();
    loginFormData.set('username', username);
    loginFormData.set('password', password);
    dispatch(login(loginFormData));
  };

  useEffect(() => {
    if (isLoggedIn) navigate(previousPage, { replace: true }); // need to fix
  }, [isLoggedIn]);

  return (
    <div className="loginFormContainer">
      <GenericForm
        header="Login"
        onSubmitHandler={loginHandler}
        formInputArray={inputArray}
        buttonText="Login"
        redirectComponent={<Link to={routes.REGISTER}>Create new account</Link>}
      />
    </div>
  );
}
