import React from 'react';
import axios from '../../api/axios';
import { authActions } from '../../store/Slices/auth';

const REGISTER_URL = '/user/register';

export default function Register() {
  const dispatch = useDispatch();

  const register = async (username, password) => {
    try {
      const response = await axios.post(REGISTER_URL, {
        username,
        password,
      });
      dispatch(authActions.login());
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return <div>Register</div>;
}
