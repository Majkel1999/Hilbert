import { LOGIN_URL, REGISTER_URL } from '../../constants/apiUrls';
import axios from '../../api/axios';
import { authActions } from './auth-slice';
import { snackBarActions } from '../snackBar/snackBar-slice';
import { SNACKBAR_STATUS } from '../../constants/stateStatuses';

export const login = (loginData) => async (dispatch) => {
  try {
    const response = await axios.post(LOGIN_URL, loginData);

    if (response.status === 200) {
      dispatch(
        authActions.login({
          token: response.data,
        }),
      );
      dispatch(
        snackBarActions.setSnackBarData({
          type: SNACKBAR_STATUS.SUCCESS,
          message: 'User logged in',
        }),
      );
    }
  } catch (error) {
    const message = JSON.parse(error.request.response).detail;
    dispatch(
      snackBarActions.setSnackBarData({
        type: SNACKBAR_STATUS.ERROR,
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
          type: SNACKBAR_STATUS.SUCCESS,
          message: 'User has been created succesfully',
        }),
      );
    return response;
  } catch (error) {
    const message = JSON.parse(error.request.response).detail;

    dispatch(
      snackBarActions.setSnackBarData({
        type: SNACKBAR_STATUS.ERROR,
        message,
      }),
    );
    return error;
  }
};
