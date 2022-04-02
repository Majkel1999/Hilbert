import axios from '../../api/axios';
import { authActions } from './auth-slice';

const LOGIN_URL = '/user/login';

export const login = (loginData) => async (dispatch) => {
  try {
    const response = await axios.post(LOGIN_URL, loginData);
    dispatch(
      authActions.login({
        token: response.data.access_token,
      }),
    );
  } catch (error) {
    console.log(error);
  }
};

export default {
  login,
};
