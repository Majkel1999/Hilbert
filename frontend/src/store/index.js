import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/auth';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
