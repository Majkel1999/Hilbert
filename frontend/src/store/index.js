import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth-slice';
import projectsReducer from './projects/projects-slice';
import snackBarReducer from './snackBar/snackBar-slice';
import userReducer from './user/user-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    snackBar: snackBarReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
