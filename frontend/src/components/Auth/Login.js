import React from 'react';
import { useDispatch } from 'react-redux';
import axios from '../../api/axios';
import { authActions } from '../../store/Slices/auth';

const LOGIN_URL = '/user/login';

export default function Login() {
  const dispatch = useDispatch();
  const login = async (username, password) => {
    try {
      const response = await axios.post(LOGIN_URL, {
        username,
        password,
      });
      dispatch(authActions.login());

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button type="button" onClick={login}>
      Click
    </button>
  );
}
