import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  token: '',
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    logIn(state, action) {
      state.token = action.payload.token;
      localStorage.setItem('token', token);
    },
    logOut(state) {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
