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
        (item) => item.name === newProject.name,
      );

      if (!existingProject) {
        state.items.push({
          name: newProject.title,
        });
      }
    },
    removeProject(state, action) {
      const projectName = action.payload;
      const projectToRemoveIndex = state.items.findIndex(
        (item) => item.name === projectName,
      );

      if (projectToRemoveIndex) {
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
