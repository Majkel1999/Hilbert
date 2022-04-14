import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import TagList from '../../components/Tags/TagList';
import FileList from '../../components/FileList/FilesList';
import { fetchSingleProjectData } from '../../store/projects/project-actions';

import './OpenedProject.scss';
import FileUploader from '../../components/FileUploader/FileUploader';

export default function OpenedProject() {
  const [fetchedData, setFetchedData] = useState(false);
  const [projectTexts, setProjectTexts] = useState([]);

  const dispatch = useDispatch();
  const params = useParams();
  const currentProjectData = useSelector(
    (state) => state.projects.currentProject,
  );

  useEffect(() => {
    const projectId = params.id;
    if (!fetchedData) dispatch(fetchSingleProjectData(projectId));
    setFetchedData(true);

    if (currentProjectData.texts) {
      const texts = currentProjectData.texts.map((element) => ({
        // eslint-disable-next-line dot-notation
        id: element['_id'],
        name: element.name,
      }));
      setProjectTexts(texts);
    }
  }, [currentProjectData]);

  return (
    <div>
      <TagList
        tags={currentProjectData.tags}
        openedProjectId={params.id}
        enableAddingTag={false}
        displayDeleteIcon={false}
      />
      <FileUploader openedProjectId={params.id} />
      <FileList files={projectTexts} openedProjectId={params.id} />
    </div>
  );
}
