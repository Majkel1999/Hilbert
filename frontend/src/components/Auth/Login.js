import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import { authActions } from '../../store/Slices/auth';
import GenericForm from '../GenericForm';

const LOGIN_URL = '/user/login';

export default function Login() {
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

  const previousPage = location?.state?.from?.pathname || '/';

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, {
        username,
        password,
      });
      dispatch(authActions.login());
      navigate(previousPage, { replace: true });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GenericForm
      header="Login"
      onSubmitHandler={login}
      formInputArray={inputArray}
      buttonText="Login"
    />
  );
}
