import axios from '../../api/axios';
import { projectsActions } from './projects-slice';
import { snackBarActions } from '../snackBar/snackBar-slice';
import { STATUS } from '../../constants/snackBarStatus';
import {
  PROJECT_URL,
  PROJECT_DATA_URL,
  TAG_URL,
} from '../../constants/apiUrls';

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
            isMultiLabel: item.is_multi_label,
          })) || [],
      }),
    );
  } catch (error) {
    const message = error.request.response;
    dispatch(
      snackBarActions.setSnackBarData({
        type: STATUS.ERROR,
        message,
      }),
    );
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
    const message = error.request.response;
    dispatch(
      snackBarActions.setSnackBarData({
        type: STATUS.ERROR,
        message,
      }),
    );
  }
};

export const deleteProject = (projectId) => async (dispatch) => {
  try {
    const response = await axios.delete(PROJECT_DATA_URL(projectId));
    if (response.status === 200)
      dispatch(projectsActions.removeProject(projectId));
  } catch (error) {
    const message = error.request.response;
    dispatch(
      snackBarActions.setSnackBarData({
        type: STATUS.ERROR,
        message,
      }),
    );
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
          isMultiLabel: response.data.is_multi_label,
        }),
      );
  } catch (error) {
    const message = error.request.response;
    dispatch(
      snackBarActions.setSnackBarData({
        type: STATUS.ERROR,
        message,
      }),
    );
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
    const message = error.request.response;
    dispatch(
      snackBarActions.setSnackBarData({
        type: STATUS.ERROR,
        message,
      }),
    );
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
    const message = error.request.response;
    dispatch(
      snackBarActions.setSnackBarData({
        type: STATUS.ERROR,
        message,
      }),
    );
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
      const message = error.request.response;
      dispatch(
        snackBarActions.setSnackBarData({
          type: STATUS.ERROR,
          message,
        }),
      );
    }
  };

export const trainModel = (projectId) => async (dispatch) => {
  try {
    const response = await axios.post(`${PROJECT_DATA_URL(projectId)}/train`);
    console.log(response);
  } catch (error) {
    const message = error.request.response;
    dispatch(
      snackBarActions.setSnackBarData({
        type: STATUS.ERROR,
        message,
      }),
    );
  }
};

export const clearTags = (projectId) => async (dispatch) => {
  try {
    const response = await axios.post(`${PROJECT_DATA_URL(projectId)}/clear`);
    console.log(response);
  } catch (error) {
    const message = error.request.response;
    dispatch(
      snackBarActions.setSnackBarData({
        type: STATUS.ERROR,
        message,
      }),
    );
  }
};

export const fetchAnnotatorData = (inviteUrl) => async (dispatch) => {
  try {
    const response = await axios.get(TAG_URL(inviteUrl));
    dispatch(
      projectsActions.setCurrentProjectData({
        name: response.data.name,
        tags: response.data.data.tags,
        texts: response.data.texts,
        inviteUrl: response.data.data.invite_url_postfix,
        isMultiLabel: response.data.is_multi_label,
      }),
    );
  } catch (error) {
    const message = error.request.response;
    dispatch(
      snackBarActions.setSnackBarData({
        type: STATUS.ERROR,
        message,
      }),
    );
  }
};

export const fetchAnnotatorText = (inviteUrl) => async (dispatch) => {
  try {
    const response = await axios.get(`${TAG_URL(inviteUrl)}/text?predict=true`);
    const { name, _id, value, preferredTag } = response.data;
    dispatch(
      projectsActions.setFetchedTextData({
        name,
        id: _id,
        value,
        preferredTag,
      }),
    );
  } catch (error) {
    const message = error.request.response;
    dispatch(
      snackBarActions.setSnackBarData({
        type: STATUS.ERROR,
        message,
      }),
    );
  }
};
export const tagText =
  ({ inviteUrl, tags, textId }) =>
  async (dispatch) => {
    try {
      const response = await axios.post(`${TAG_URL(inviteUrl)}/tag`, {
        tags,
        text_id: textId,
      });
      if (response.status === 200) dispatch(fetchAnnotatorText(inviteUrl));
    } catch (error) {
      const message = error.request.response;
      dispatch(
        snackBarActions.setSnackBarData({
          type: STATUS.ERROR,
          message,
        }),
      );
    }
  };
