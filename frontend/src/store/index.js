import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth-slice';
import projectsReducer from './projects/projects-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
  },
});

export default store;
