import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import TagList from '../../components/Tags/TagList';
import { fetchSingleProjectData } from '../../store/projects/project-actions';

import './OpenedProject.scss';

export default function OpenedProject() {
  const dispatch = useDispatch();
  const params = useParams();
  const projects = useSelector((state) => state.projects.items);
  // eslint-disable-next-line no-unused-vars
  const [currentProjectData, setCurrentProjectData] = useState([]);

  useEffect(() => {
    const projectId = params.id;
    dispatch(fetchSingleProjectData(projectId));
    if (projects) {
      const updatedProject = projects.find((item) => item.id === projectId);
      setCurrentProjectData(updatedProject);
    }
  });

  return <TagList tags={currentProjectData.tags} />;
}
