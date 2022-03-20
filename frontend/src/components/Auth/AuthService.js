import axios from '../../api/axios';
import store from '../../store/index';
import { authActions } from '../../store/Slices/auth';

export const register = async (username, password) => {
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

export const login = async (username, password) => {
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
