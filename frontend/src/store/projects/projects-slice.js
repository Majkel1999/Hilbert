import { createSlice } from '@reduxjs/toolkit';

const initialProjectsState = {
  items: [],
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState: initialProjectsState,
  reducers: {
    createNewProject(state, action) {
      const newProject = action.payload;
      const existingProject = state.items.find(
        (item) => item.id === newProject.id,
      );
      if (!existingProject) {
        state.items.push(newProject);
      }
    },
    removeProject(state, action) {
      const projectId = action.payload;
      const projectToRemoveIndex = state.items.findIndex(
        (item) => item.id === projectId,
      );
      if (projectToRemoveIndex >= 0) {
        state.items.splice(projectToRemoveIndex, 1);
      }
    },
    replaceProjectList(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
  },
});

export const projectsActions = projectsSlice.actions;
export default projectsSlice.reducer;
