import axios from '../../api/axios';
import { projectsActions } from './projects-slice';

const FETCH_PROJECTS_URL = '/project';
const CREATE_PROJECT_URL = 'project/create';
const DELETE_PROJECT_URL = (id) => `project/delete/${id}`;
const TAG_OPERATION_URL = (projectId) => `/project/data/tag/${projectId}`;

export const fetchProjectsData = () => async (dispatch) => {
  try {
    const projectsData = await axios.get(FETCH_PROJECTS_URL);
    dispatch(
      projectsActions.replaceProjectList({
        items:
          projectsData.data.map((item) => ({
            name: item.name,
            // eslint-disable-next-line dot-notation
            id: item['_id'],
          })) || [],
        totalQuantity: projectsData.data.length,
      }),
    );
  } catch (error) {
    console.log(error);
    // dispatching some notification actions
  }
};

export const sendProjectsData = (project) => async (dispatch) => {
  try {
    const response = await axios.post(CREATE_PROJECT_URL, project);
    const { name } = response.data;

    if (response.status === 200)
      dispatch(
        // eslint-disable-next-line dot-notation
        projectsActions.createNewProject({ id: response.data['_id'], name }),
      );
  } catch (error) {
    console.log(error);
  }
};

export const deleteProject = (projectId) => async (dispatch) => {
  try {
    const response = await axios.delete(DELETE_PROJECT_URL(projectId));
    if (response.status === 200)
      dispatch(projectsActions.removeProject(projectId));
  } catch (error) {
    console.log(error);
  }
};

export const addTagToProject = (projectId, tag) => async (dispatch) => {
  try {
    const response = await axios.post(TAG_OPERATION_URL(projectId), {
      tag,
    });
    if (response.status === 200) dispatch(fetchProjectsData());
  } catch (error) {
    console.log(error);
  }
};

export const removeTagFromProject = (projectId, tag) => async (dispatch) => {
  try {
    const response = await axios.delete(TAG_OPERATION_URL(projectId), {
      tag,
    });
    if (response.status === 200) dispatch(fetchProjectsData());
  } catch (error) {
    console.log(error);
  }
};
