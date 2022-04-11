import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import TagList from '../../components/Tags/TagList';
import { fetchSingleProjectData } from '../../store/projects/project-actions';

import './OpenedProject.scss';
import FileUploader from '../../components/FileUploader/FileUploader';

export default function OpenedProject() {
  const [fetchedData, setFetchedData] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const currentProjectData = useSelector(
    (state) => state.projects.currentProject,
  );

  useEffect(() => {
    const projectId = params.id;
    if (!fetchedData) dispatch(fetchSingleProjectData(projectId));
    setFetchedData(true);
  });

  return (
    <div>
      <FileUploader />
      <TagList tags={currentProjectData.tags} openedProjectId={params.id} />;
    </div>
  );
}
