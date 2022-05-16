import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
  username: '',
  email: '',
  fullName: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUserData(state, action) {
      const { username, email, fullName } = action.payload;
      state.username = username;
      state.email = email;
      state.fullName = fullName;
    },
    removeUserData(state) {
      state.username = '';
      state.email = '';
      state.fullName = '';
    },
  },
});

export const authActions = userSlice.actions;
export default userSlice.reducer;
