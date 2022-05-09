import { LOGIN_URL, REGISTER_URL } from '../../constants/apiUrls';
import axios from '../../api/axios';
import { authActions } from './auth-slice';
import { snackBarActions } from '../snackBar/snackBar-slice';
import { STATUS } from '../../constants/snackBarStatus';

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
        type: STATUS.ERROR,
        message,
      }),
    );
  }
};

export const register = (registerData) => async (dispatch) => {
  try {
    const response = await axios.post(REGISTER_URL, registerData);
    if (response.status === 200)
      dispatch(
        snackBarActions.setSnackBarData({
          type: STATUS.SUCCESS,
          message: 'User has been created succesfully',
        }),
      );
    return response;
  } catch (error) {
    const message = error.request.response;
    dispatch(
      snackBarActions.setSnackBarData({
        type: STATUS.ERROR,
        message,
      }),
    );
    return error;
  }
};
