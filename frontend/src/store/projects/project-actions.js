/* eslint-disable dot-notation */
import axios from '../../api/axios';
import { projectsActions } from './projects-slice';
import { snackBarActions } from '../snackBar/snackBar-slice';
import { SNACKBAR_STATUS, MODEL_STATE } from '../../constants/stateStatuses';
import {
  PROJECT_URL,
  PROJECT_DATA_URL,
  TAG_URL,
} from '../../constants/apiUrls';

export const fetchProjectsData = () => async (dispatch) => {
  try {
    const projectsData = await axios.get(PROJECT_URL);

    if (projectsData.status === 200)
      dispatch(
        projectsActions.setProjectData({
          type: 'items',
          data:
            projectsData.data.map((item) => ({
              name: item.name,
              id: item['_id'],
              tags: item.data.tags,
              inviteUrl: item.data.invite_url_postfix,
              isMultiLabel: item.is_multi_label,
            })) || [],
        }),
      );
  } catch (error) {
    const message = JSON.parse(error.request.response).detail;
    dispatch(
      snackBarActions.setSnackBarData({
        type: SNACKBAR_STATUS.ERROR,
        message,
      }),
    );
  }
};

export const sendProjectsData = (project) => async (dispatch) => {
  try {
    const response = await axios.post(PROJECT_URL, project);
    const { name } = response.data;

    if (response.status === 200) {
      dispatch(
        projectsActions.createNewProject({ id: response.data['_id'], name }),
      );
      dispatch(
        snackBarActions.setSnackBarData({
          type: SNACKBAR_STATUS.SUCCESS,
          message: `Project ${name} has been created`,
        }),
      );
    }
  } catch (error) {
    const message = JSON.parse(error.request.response).detail;
    dispatch(
      snackBarActions.setSnackBarData({
        type: SNACKBAR_STATUS.ERROR,
        message,
      }),
    );
  }
};

export const deleteProject = (projectId) => async (dispatch) => {
  try {
    const response = await axios.delete(PROJECT_DATA_URL(projectId));
    if (response.status === 200) {
      dispatch(projectsActions.removeProject(projectId));
      dispatch(
        snackBarActions.setSnackBarData({
          type: SNACKBAR_STATUS.SUCCESS,
          message: 'Project has been deleted',
        }),
      );
    }
  } catch (error) {
    const message = JSON.parse(error.request.response).detail;
    dispatch(
      snackBarActions.setSnackBarData({
        type: SNACKBAR_STATUS.ERROR,
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
        projectsActions.setProjectData({
          type: 'project',
          data: {
            name: response.data.name,
            tags: response.data.data.tags,
            texts: response.data.texts,
            inviteUrl: response.data.data.invite_url_postfix,
            isMultiLabel: response.data.is_multi_label,
            modelState: response.data.model_state,
          },
        }),
      );
  } catch (error) {
    const message = JSON.parse(error.request.response).detail;
    dispatch(
      snackBarActions.setSnackBarData({
        type: SNACKBAR_STATUS.ERROR,
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
    if (response.status === 200) {
      if (response.status === 200) {
        dispatch(fetchSingleProjectData(projectId));
        dispatch(
          snackBarActions.setSnackBarData({
            type: SNACKBAR_STATUS.SUCCESS,
            message: `Tag ${tag} has been added`,
          }),
        );
      }
    }
  } catch (error) {
    const message = JSON.parse(error.request.response).detail;
    dispatch(
      snackBarActions.setSnackBarData({
        type: SNACKBAR_STATUS.ERROR,
        message,
      }),
    );
  }
};

export const removeTagFromProject = (projectId, tag) => async (dispatch) => {
  try {
    const response = await axios.delete(`${PROJECT_DATA_URL(projectId)}/tag`, {
      data: { tag },
    });
    if (response.status === 200) {
      dispatch(fetchSingleProjectData(projectId));
      if (response.status === 200)
        dispatch(
          snackBarActions.setSnackBarData({
            type: SNACKBAR_STATUS.SUCCESS,
            message: `Tag ${tag} has been removed`,
          }),
        );
    }
  } catch (error) {
    const message = JSON.parse(error.request.response).detail;
    dispatch(
      snackBarActions.setSnackBarData({
        type: SNACKBAR_STATUS.ERROR,
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
    if (response.status === 200) {
      dispatch(fetchSingleProjectData(projectId));
      dispatch(
        snackBarActions.setSnackBarData({
          type: SNACKBAR_STATUS.SUCCESS,
          message: 'Upload finished successfully',
        }),
      );
    }
  } catch (error) {
    const message = JSON.parse(error.request.response).detail;
    dispatch(
      snackBarActions.setSnackBarData({
        type: SNACKBAR_STATUS.ERROR,
        message,
      }),
    );
  }
};

export const downloadProjectModel = (projectId) => async (dispatch) => {
  try {
    const response = await axios.get(`${PROJECT_DATA_URL(projectId)}/model`, {
      responseType: 'arraybuffer',
    });

    const blobUrl = window.URL.createObjectURL(
      new Blob([response.data], { type: 'application/zip' }),
    );
    const element = document.createElement('a');

    element.setAttribute('href', blobUrl);
    element.setAttribute('download', 'model.zip');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  } catch (error) {
    const message = JSON.parse(error.request.response).detail;
    dispatch(
      snackBarActions.setSnackBarData({
        type: SNACKBAR_STATUS.ERROR,
        message,
      }),
    );
  }
};

export const downloadProjectFiles = (projectId) => async (dispatch) => {
  try {
    const response = await axios.get(`${PROJECT_DATA_URL(projectId)}/file`);
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      `data:text/csv;charset=utf-8,${encodeURIComponent(response.data)}`,
    );
    element.setAttribute('download', 'files.csv');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  } catch (error) {
    const message = JSON.parse(error.request.response).detail;
    dispatch(
      snackBarActions.setSnackBarData({
        type: SNACKBAR_STATUS.ERROR,
        message,
      }),
    );
  }
};

export const fetchProjectMetrics = (projectId) => async (dispatch) => {
  try {
    const response = await axios.get(`${PROJECT_DATA_URL(projectId)}/metrics`);
    dispatch(
      projectsActions.setProjectData({
        type: 'metrics',
        data: {
          trainData: response.data.trainData,
          configData: response.data.config,
        },
      }),
    );
  } catch (error) {
    const message = JSON.parse(error.request.response).detail;
    dispatch(
      snackBarActions.setSnackBarData({
        type: SNACKBAR_STATUS.ERROR,
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

      if (response.status === 200) {
        dispatch(fetchSingleProjectData(projectId));
        dispatch(
          snackBarActions.setSnackBarData({
            type: SNACKBAR_STATUS.SUCCESS,
            message: 'File has been deleted',
          }),
        );
      }
    } catch (error) {
      const message = JSON.parse(error.request.response).detail;
      dispatch(
        snackBarActions.setSnackBarData({
          type: SNACKBAR_STATUS.ERROR,
          message,
        }),
      );
    }
  };

export const trainModel = (projectId) => async (dispatch) => {
  try {
    const response = await axios.post(`${PROJECT_DATA_URL(projectId)}/train`);

    if (response.status === 200) {
      dispatch(
        snackBarActions.setSnackBarData({
          type: SNACKBAR_STATUS.INFO,
          message: 'Model training started',
        }),
      );
      dispatch(
        projectsActions.setProjectData({
          type: 'project',
          data: {
            modelState: MODEL_STATE.TRAINING,
          },
        }),
      );
    }
  } catch (error) {
    const message = JSON.parse(error.request.response).detail;
    dispatch(
      snackBarActions.setSnackBarData({
        type: SNACKBAR_STATUS.ERROR,
        message,
      }),
    );
  }
};

export const clearTags = (projectId) => async (dispatch) => {
  try {
    const response = await axios.post(`${PROJECT_DATA_URL(projectId)}/clear`);

    if (response.status === 200)
      dispatch(
        snackBarActions.setSnackBarData({
          type: SNACKBAR_STATUS.SUCCESS,
          message: 'Tags has been cleared',
        }),
      );
  } catch (error) {
    const message = JSON.parse(error.request.response).detail;
    dispatch(
      snackBarActions.setSnackBarData({
        type: SNACKBAR_STATUS.ERROR,
        message,
      }),
    );
  }
};

export const fetchAnnotatorData = (inviteUrl) => async (dispatch) => {
  try {
    const response = await axios.get(TAG_URL(inviteUrl));

    dispatch(
      projectsActions.setProjectData({
        type: 'project',
        data: {
          id: response.data['_id'],
          name: response.data.name,
          tags: response.data.data.tags,
          texts: response.data.texts,
          inviteUrl: response.data.data.invite_url_postfix,
          isMultiLabel: response.data.is_multi_label,
        },
      }),
    );
  } catch (error) {
    const message = JSON.parse(error.request.response).detail;
    dispatch(
      snackBarActions.setSnackBarData({
        type: SNACKBAR_STATUS.ERROR,
        message,
      }),
    );
  }
};

export const fetchAnnotatorText =
  (inviteUrl, predict = true) =>
  async (dispatch) => {
    try {
      const response = await axios.get(
        `${TAG_URL(inviteUrl)}/text?predict=${predict}`,
      );
      const { name, _id, value, preferredTag } = response.data;
      dispatch(
        projectsActions.setProjectData({
          type: 'text',
          data: {
            name,
            id: _id,
            value,
            preferredTag,
          },
        }),
      );
      return response;
    } catch (error) {
      const message = JSON.parse(error.request.response).detail;
      dispatch(
        snackBarActions.setSnackBarData({
          type: SNACKBAR_STATUS.ERROR,
          message,
        }),
      );
      if (error.response.status === 400) {
        dispatch(fetchAnnotatorText(inviteUrl, false));
      }

      return error;
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

      if (response.status === 200) {
        dispatch(
          snackBarActions.setSnackBarData({
            type: SNACKBAR_STATUS.SUCCESS,
            message: 'Tags have been submited',
          }),
        );
      }
    } catch (error) {
      const message = JSON.parse(error.request.response).detail;

      dispatch(
        snackBarActions.setSnackBarData({
          type: SNACKBAR_STATUS.ERROR,
          message,
        }),
      );
    }
  };
