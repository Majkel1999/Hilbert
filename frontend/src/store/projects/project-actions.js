import axios from '../../api/axios';
import { projectsActions } from './projects-slice';

const PROJECT_URL = '/project';
const PROJECT_WITH_ID_URL = (id) => `project/${id}`;
const TAG_OPERATION_URL = (projectId) => `/project/data/tag/${projectId}`;

export const fetchProjectsData = () => async (dispatch) => {
  try {
    const projectsData = await axios.get(PROJECT_URL);
    dispatch(
      projectsActions.replaceProjectList({
        items:
          projectsData.data.map((item) => ({
            name: item.name,
            // eslint-disable-next-line dot-notation
            id: item['_id'],
            tags: item.data.tags,
          })) || [],
      }),
    );
  } catch (error) {
    console.log(error);
    // dispatching some notification actions
  }
};

export const sendProjectsData = (project) => async (dispatch) => {
  try {
    const response = await axios.post(PROJECT_URL, project);
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
    const response = await axios.delete(PROJECT_WITH_ID_URL(projectId));
    if (response.status === 200)
      dispatch(projectsActions.removeProject(projectId));
  } catch (error) {
    console.log(error);
  }
};

export const fetchSingleProjectData = (projectId) => async (dispatch) => {
  try {
    const response = await axios.get(PROJECT_WITH_ID_URL(projectId));

    if (response.status === 200)
      dispatch(
        projectsActions.setCurrentProjectData({
          name: response.data.name,
          tags: response.data.data.tags,
        }),
      );
  } catch (error) {
    console.log(error);
  }
};
export const addTagToProject = (projectId, tag) => async (dispatch) => {
  try {
    const response = await axios.post(TAG_OPERATION_URL(projectId), {
      tag,
    });
    if (response.status === 200) dispatch(fetchSingleProjectData(projectId));
  } catch (error) {
    console.log(error);
  }
};

export const removeTagFromProject = (projectId, tag) => async (dispatch) => {
  try {
    const response = await axios.delete(TAG_OPERATION_URL(projectId), {
      data: { tag },
    });
    if (response.status === 200) dispatch(fetchSingleProjectData(projectId));
  } catch (error) {
    console.log(error);
  }
};
