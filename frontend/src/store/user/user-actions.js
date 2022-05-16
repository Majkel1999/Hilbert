/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import axios from '../../api/axios';
import { USER_URL } from '../../constants/apiUrls';
import { userActions } from './user-slice';
import { snackBarActions } from '../snackBar/snackBar-slice';
import { STATUS } from '../../constants/snackBarStatus';

export const getUserDetails = () => async (dispatch) => {
  try {
    const response = await axios.get(USER_URL);
    console.log(response);
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
        type: STATUS.ERROR,
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
    }
  } catch (error) {
    const message = JSON.parse(error.request.response).detail;
    dispatch(
      snackBarActions.setSnackBarData({
        type: STATUS.ERROR,
        message,
      }),
    );
  }
};
