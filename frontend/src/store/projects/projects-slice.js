import { createSlice } from '@reduxjs/toolkit';

const initialProjectsState = {
  items: [],
  changed: false,
  totalQuantity: 0,
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
          id: newProject.id,
          quantity: 1,
          name: newProject.title,
        });
        state.totalQuantity++;
        state.changed = true;
      }
    },
    removeProject(state, action) {
      const id = action.payload;
      const projectToRemoveIndex = state.items.findIndex(
        (item) => item.id === id,
      );

      if (projectToRemoveIndex) {
        state.items.splice(projectToRemoveIndex, 1);
        state.totalQuantity--;
        state.changed = true;
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
