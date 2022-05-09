import { createSlice } from '@reduxjs/toolkit';

const initialSnackBar = {
  message: '',
  type: '',
  show: false,
};

const snackBarSlice = createSlice({
  name: 'snackBar',
  initialState: initialSnackBar,
  reducers: {
    setSnackBarData(state, action) {
      const { message, type } = action.payload;
      state.message = message;
      state.type = type;
      state.show = true;
    },
    resetSnackBarData(state) {
      state.message = '';
      state.type = '';
      state.show = false;
    },
  },
});

export const snackBarActions = snackBarSlice.actions;
export default snackBarSlice.reducer;
