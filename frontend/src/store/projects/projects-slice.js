import { createSlice } from '@reduxjs/toolkit';

const initialProjectsState = {};

const projectsSlice = createSlice({
  name: 'projects',
  initialState: initialProjectsState,
  reducers: {},
});

export const projectsActions = projectsSlice.actions;
export default projectsSlice.reducer;
