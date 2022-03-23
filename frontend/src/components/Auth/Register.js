import React from 'react';
import axios from '../../api/axios';
import { authActions } from '../../store/Slices/auth';

export default function Register() {
  const register = async (username, password) => {
    try {
      const response = await axios.post('user/register', {
        username,
        password,
      });
      store.dispatch(authActions.login());
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return <div>Register</div>;
}
