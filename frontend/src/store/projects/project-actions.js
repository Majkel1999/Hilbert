import axios from '../../api/axios';
import { projectsActions } from './projects-slice';

const PROJECT_URL = '/project';
const PROJECT_DATA_URL = (projectId) => `${PROJECT_URL}/${projectId}`;

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
            inviteUrl: item.data.invite_url_postfix,
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
    const response = await axios.delete(PROJECT_DATA_URL(projectId));
    if (response.status === 200)
      dispatch(projectsActions.removeProject(projectId));
  } catch (error) {
    console.log(error);
  }
};

export const fetchSingleProjectData = (projectId) => async (dispatch) => {
  try {
    const response = await axios.get(PROJECT_DATA_URL(projectId));
    if (response.status === 200)
      dispatch(
        projectsActions.setCurrentProjectData({
          name: response.data.name,
          tags: response.data.data.tags,
          texts: response.data.texts,
          inviteUrl: response.data.data.invite_url_postfix,
        }),
      );
  } catch (error) {
    console.log(error);
  }
};
export const addTagToProject = (projectId, tag) => async (dispatch) => {
  try {
    const response = await axios.post(`${PROJECT_DATA_URL(projectId)}/tag`, {
      tag,
    });
    if (response.status === 200) dispatch(fetchSingleProjectData(projectId));
  } catch (error) {
    console.log(error);
  }
};

export const removeTagFromProject = (projectId, tag) => async (dispatch) => {
  try {
    const response = await axios.delete(`${PROJECT_DATA_URL(projectId)}/tag`, {
      data: { tag },
    });
    if (response.status === 200) dispatch(fetchSingleProjectData(projectId));
  } catch (error) {
    console.log(error);
  }
};

export const uploadFilesToProject = (projectId, files) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${PROJECT_DATA_URL(projectId)}/file`,
      files,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    if (response.status === 200) dispatch(fetchSingleProjectData(projectId));
  } catch (error) {
    console.log(error);
  }
};

export const deleteFileFromProject =
  (projectId, fileId) => async (dispatch) => {
    try {
      const response = await axios.delete(
        `${PROJECT_DATA_URL(projectId)}/file`,
        {
          data: { file_id: fileId },
        },
      );
      if (response.status === 200) dispatch(fetchSingleProjectData(projectId));
    } catch (error) {
      console.log(error);
    }
  };

export const trainModel = (projectId) => async () => {
  try {
    const response = await axios.post(PROJECT_DATA_URL(projectId));
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
