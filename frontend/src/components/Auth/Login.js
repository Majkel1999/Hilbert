import React from 'react';
import * as authService from './AuthService';

export default function Login() {
  const login = () => {
    authService.login();
  };
  return (
    <button type="button" onClick={login}>
      Click
    </button>
  );
}
