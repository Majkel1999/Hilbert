import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth-slice';
import projectsReducer from './projects/projects-slice';
import snackBarReducer from './snackBar/snackBar-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    snackBar: snackBarReducer,
  },
});

export default store;
