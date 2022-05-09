import { LOGIN_URL, REGISTER_URL } from '../../constants/apiUrls';
import axios from '../../api/axios';
import { authActions } from './auth-slice';
import { snackBarActions } from '../snackBar/snackBar-slice';

export const login = (loginData) => async (dispatch) => {
  try {
    const response = await axios.post(LOGIN_URL, loginData);

    dispatch(
      authActions.login({
        token: response.data,
      }),
    );
  } catch (error) {
    const message = error.request.response;
    dispatch(
      snackBarActions.setSnackBarData({
        type: 'error',
        message,
      }),
    );
  }
};

export const register = (registerData) => async () => {
  try {
    const response = await axios.post(REGISTER_URL, registerData);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
