import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialAuthState = {
  token: '',
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    logIn(state) {},
    logOut(state) {},
  },
});

export const authActions = authSlice.actions;
export default coordSlice.reducer;
