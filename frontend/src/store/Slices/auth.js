import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  token: '',
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const receivedToken = action.payload.token;
      localStorage.setItem('token', receivedToken);
      state.isLoggedIn = true;
      state.token = receivedToken;
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem('token');
      state.isLoggedIn = false;
    },
    retrieveStoredToken(state) {
      const storedToken = localStorage.getItem('token');
      state.isLoggedIn = !!storedToken;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
