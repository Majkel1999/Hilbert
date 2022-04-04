import axios from '../../api/axios';
import { projectsActions } from './projects-slice';

const FETCH_PROJECTS_URL = '/project';
const CREATE_PROJECT_URL = 'project/create';

export const fetchProjectsData = () => async (dispatch) => {
  try {
    const projectsData = await axios.get(FETCH_PROJECTS_URL);
    dispatch(
      projectsActions.replaceProjectList({
        items: projectsData.items || [],
        totalQuantity: projectsData.items.length(),
      }),
    );
  } catch (error) {
    console.log(error);
    // dispatching some notification actions
  }
};

export const sendProjectsData = (project) => async () => {
  try {
    const response = await axios.post(CREATE_PROJECT_URL, project);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
