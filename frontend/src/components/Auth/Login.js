import React from 'react';
import axios from '../../api/axios';
import { authActions } from '../../store/Slices/auth';

export default function Login() {
  const login = async (username, password) => {
    try {
      const response = await axios.post('/user/login', {
        username,
        password,
      });
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
