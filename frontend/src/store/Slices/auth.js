import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {},
});

export const authActions = authSlice.actions;
export default coordSlice.reducer;
