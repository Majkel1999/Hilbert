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
      console.log(action.payload.token)
      localStorage.setItem('token', JSON.stringify(receivedToken));
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem('token');
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
