import axios from 'axios';
import { authActions } from './auth-slice';

const BASE_URL = process.env.REACT_APP_SERVER_URL;
const LOGIN_URL = '/user/login';
const REFRESH_URL = 'user/refresh';
const REGISTER_URL = '/user/register';

const instance = axios.create({
  baseURL: BASE_URL,
});


export const login = (loginData) => async (dispatch) => {
  try {
    const response = await instance.post(LOGIN_URL, loginData);

    dispatch(
      authActions.login({
        token: response.data,
      }),
    );
  } catch (error) {
    console.log(error);
  }
};

export const refresh = () => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem('refresh_token'));
    const response = await instance.post(REFRESH_URL, null,
      {
        headers: {
          'Authorization': token
            ? `${token.token_type} ${token.refresh_token}`
            : ''
        }
      });
    dispatch(authActions.login({
      token: response.data
    }))
  }
  catch (error) {
    console.log(error);
  }
}

export const register = (registerData) => async () => {
  try {
    const response = await instance.post(REGISTER_URL, registerData);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default {
  login,
  register,
  refresh
};
