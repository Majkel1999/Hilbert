import './AdminBoard.scss';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  sendProjectsData,
  fetchProjectsData,
} from '../../store/projects/project-actions';
import ProjectList from '../../components/Project/ProjectList/ProjectList';

const MOCKED_PROJECTS = [
  {
    name: 'Project 1',
  },
  {
    name: 'Project 2',
  },
  {
    name: 'Project 3',
  },
  {
    name: 'Project 4',
  },
  {
    name: 'Project 5',
  },
];
let isInitial = true;

export default function AdminBoard() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjectsData);
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) isInitial = false;
    if (projects.changed) dispatch(sendProjectsData(projects));
  }, [projects, dispatch]);

  return (
    <div className="adminBoardContainer">
      <ProjectList items={MOCKED_PROJECTS}> </ProjectList>
    </div>
  );
}
