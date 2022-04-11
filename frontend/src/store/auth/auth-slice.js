import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isLoggedIn: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const receivedToken = action.payload.token;
      localStorage.setItem('token', JSON.stringify({ "token_type": receivedToken.token_type, "access_token": receivedToken.access_token }));
      if (receivedToken.refresh_token) {
        localStorage.setItem('refresh_token', JSON.stringify({ "token_type": receivedToken.token_type, "refresh_token": receivedToken.refresh_token }));
      }
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
