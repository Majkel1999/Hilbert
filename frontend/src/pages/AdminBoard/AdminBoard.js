import './AdminBoard.scss';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as projectActions from '../../store/projects/project-actions';
import ProjectList from '../../components/Project/ProjectList/ProjectList';

export default function AdminBoard() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(projectActions.fetchProjectsData());
  }, [dispatch]);

  return (
    <div className="adminBoardContainer">
      <ProjectList items={projects.items}> </ProjectList>
    </div>
  );
}
