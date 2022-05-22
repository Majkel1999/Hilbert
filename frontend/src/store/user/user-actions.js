/* eslint-disable camelcase */
import axios from '../../api/axios';
import { USER_URL } from '../../constants/apiUrls';
import { userActions } from './user-slice';
import { authActions } from '../auth/auth-slice';

import { snackBarActions } from '../snackBar/snackBar-slice';
import { SNACKBAR_STATUS } from '../../constants/snackBarStatus';

export const getUserDetails = () => async (dispatch) => {
  try {
    const response = await axios.get(USER_URL);

    const { username, email, full_name } = response.data;
    if (response.status === 200) {
      dispatch(
        userActions.setUserData({
          username,
          email,
          fullName: full_name,
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

export const deleteUser = () => async (dispatch) => {
  try {
    const response = await axios.delete(USER_URL);

    if (response.status === 200) {
      dispatch(userActions.removeUserData());
      dispatch(authActions.logout());
    }
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
